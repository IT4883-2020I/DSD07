import Report from '../models/Report.js';
import { isEmptyArray } from '../utils/commonUtils.js';

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

  // createReport: async ({
  //   userId,
  //   reviewerId,
  //   tables,
  //   sectionKeys,
  //   charts,
  //   keys,
  //   name,
  //   templateId
  // }) => {
  //   const newReport = await Report
  //     .create({
  //       tables: ,
  //       sectionKeys,

  //     })
  // }
}