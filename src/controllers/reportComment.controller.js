import mongoose from 'mongoose';
import Report from '../models/Report.js';
import ReportComment from '../models/ReportComment.js';

export default {
  createComment: async ({
    userId,
    userAvatarUrl,
    userFullName,
    comment,
    reportId
  }) => {
    const report = await Report
      .findOne({
        _id: reportId,
        $or: [
          { userId },
          { reviewerId: userId }
        ]
      });

    if (!report) return { comment_id: null };

    const session = await mongoose.startSession();
    session.startTransaction();

    let commentId = null;

    await ReportComment
      .create({
        userId,
        userAvatarUrl,
        userFullName,
        comment
      })
      .then(newComment => {
        commentId = newComment._id;
        return Report
          .update(
            { _id: reportId },
            { $push: { comments: newComment._id } }
          )
      });
    return { comment_id: commentId };
  },
  updateComment: async ({
    reportId,
    commentId,
    comment,
    userId
  }) => {
    const report = await Report
      .findOne({ _id: reportId });
    if (!report) return { comment_id: null };

    const updatedComment = await ReportComment
      .update({
        _id: commentId,
        user_id: userId
      }, { comment });

    return { comment_id: updatedComment._id };
  },
  deleteComment: async ({
    reportId,
    commentId,
    userId
  }) => {
    const report = await Report
      .findOne({ _id: reportId });
    if (!report) return { comment_id: null };

    const deletedComment = await ReportComment
      .deleteOne({
        _id: commentId,
        user_id: userId
      });

    return { comment_id: deletedComment._id };
  }
}