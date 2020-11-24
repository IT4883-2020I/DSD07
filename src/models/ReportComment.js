import mongoose from 'mongoose';

const reportCommentSchema = new mongoose.Schema({
  userId: Number,
  userAvatarUrl: String,
  userFullName: String,
  createdAt: Date,
  comment: String
}, {
  versionKey: false
});

const ReportComment = mongoose.model('ReportComment', reportCommentSchema, 'rp_comments');

export default ReportComment;
