import ReportTemplate from '../models/ReportTemplate.js';

export default {
  getTemplatesList: async () => {
    const templates = await ReportTemplate
      .aggregate()
      .project({
        _id: 0,
        id: '$_id',
        type: 1,
        typeKey: 1
      });
    return templates;
  }
}