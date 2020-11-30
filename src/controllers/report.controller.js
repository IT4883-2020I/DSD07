import mongoose from 'mongoose';
import Report from '../models/Report.js';
import { isEmptyArray } from '../utils/commonUtils.js';

const { Types } = mongoose;

export default {
  getReportsList: async ({
    userId,
    role
  }) => {
    const reports = await Report
      .aggregate()
      .match({
        [`${role === 'author' ? 'userId' : 'reviewerId'}`]: userId
      })
      .project({
        _id: 0,
        id: '$_id',
        name: 1,
        createdAt: 1
      })
      .sort({ createdAt: -1 });
    return reports;
  },

  getReport: async ({
    reportId,
    userId,
  }) => {
    const report = await Report
      .findOne({
        _id: reportId,
        $or: [
          { userId },
          { reviewerId: userId }
        ]
      })
      .select('-_id')
      .populate('comments');

    return report;
  },

  createReport: async ({
    userId,
    reviewerId,
    name,
    sections
  }) => {
    const newReport = await Report
      .create({
        sections,
        name,
        userId,
        reviewerId,
        isAccepted: false,
        status: 'reviewing',
        createdAt: Date.now()
      });
    return { report_id: newReport._id }
  },

  updateReport: async ({
    id,
    userId,
    sections,
    name,
  }) => {
    const report = await Report
      .findOne({
        _id: id,
        userId
      });

    if (!report) return { report_id: null };

    const updates = {};
    if (name) updates.name = name;
    if (sections) updates.sections = sections;
    const updatedReport = await Report
      .findByIdAndUpdate(id, {
        updatedAt: Date.now(),
        ...updates
      });

    return { report_id: updatedReport._id };
  },

  deleteReport: async ({
    id,
    userId
  }) => {
    const report = await Report
      .findOne({
        _id: id,
        userId
      });

    if (!report) return { report_id: null };

    await Report.deleteOne({ _id: id });
    return { report_id: report._id };
  },

  acceptReport: async ({
    reportId,
    userId
  }) => {
    const acceptedReport = await Report
      .update({ _id: reportId, reviewerId: userId }, { status: 'accepted' });

    return { report_id: acceptedReport._id };
  }
}