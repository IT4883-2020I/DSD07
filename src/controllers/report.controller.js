import mongoose from 'mongoose';
import Report from '../models/Report.js';
import { isEmptyArray } from '../utils/commonUtils.js';

const { Types } = mongoose;

export default {
  getReportsList: async ({
    userId,
    byMe
  }) => {
    const reports = await Report
      .aggregate()
      .match({
        [`${byMe ? 'userId' : 'reviewerId'}`]: userId
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
      .populate('comments')
      .populate('template', '_id type typeKey');

    return report;
  },

  createReport: async ({
    userId,
    reviewerId,
    tables,
    sectionKeys,
    charts,
    keys,
    name,
    templateId
  }) => {
    const newReport = await Report
      .create({
        tables: isEmptyArray(tables) ? [] : tables,
        sectionKeys: isEmptyArray(sectionKeys) ? [] : sectionKeys,
        charts: isEmptyArray(sectionKeys) ? [] : charts,
        keys,
        name,
        template: Types.ObjectId(templateId),
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
    tables,
    sectionKeys,
    charts,
    keys,
    name,
  }) => {
    const report = await Report
      .findOne({
        _id: id,
        userId
      });

    if (!report) return { report_id: null };

    const updates = {};
    if (keys) updates.keys = keys;
    if (name) updates.name = name;
    if (sectionKeys && !isEmptyArray(sectionKeys)) updates.sectionKeys = sectionKeys;
    if (tables && !isEmptyArray(tables)) updates.tables = tables;
    if (charts && !isEmptyArray(charts)) updates.charts = charts;
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
  }
}