import ReportTemplate from '../models/ReportTemplate.js';
import { isEmptyArray } from '../utils/commonUtils.js';

function getContentType(sectionKeys, tables, charts) {
  if (isEmptyArray(sectionKeys) && isEmptyArray(tables) && isEmptyArray(charts)) {
    return 'none';
  } else if (!isEmptyArray(sectionKeys) && isEmptyArray(tables) && isEmptyArray(charts)) {
    return 'section';
  } else if (isEmptyArray(sectionKeys) && !isEmptyArray(tables) && isEmptyArray(charts)) {
    return 'table';
  } else if (isEmptyArray(sectionKeys) && isEmptyArray(tables) && !isEmptyArray(charts)) {
    return 'chart';
  }
  return 'mixture';
}

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
  },

  getTemplate: async ({
    id
  }) => {
    const template = await ReportTemplate
      .findById(id)
      .select('-_id');
    return template;
  },

  createTemplate: async ({
    type,
    title,
    opening,
    sectionKeys,
    tables,
    charts
  }) => {
    const newTemplate = await ReportTemplate
      .create({
        type,
        typeKey: 'custom',
        url: null,
        title,
        opening,
        contentType: getContentType(sectionKeys, tables, charts),
        sectionKeys: isEmptyArray(sectionKeys) ? [] : sectionKeys,
        tables: isEmptyArray(tables) ? [] : tables,
        charts: isEmptyArray(charts) ? [] : charts
      });

    return { template_id: newTemplate._id };
  },

  updateTemplate: async ({
    id,
    type,
    title,
    opening,
    sectionKeys,
    tables,
    charts
  }) => {
    const updatedTemplate = await ReportTemplate
      .findByIdAndUpdate(id, {
        type,
        title,
        opening,
        contentType: getContentType(sectionKeys, tables, charts),
        sectionKeys: isEmptyArray(sectionKeys) ? [] : sectionKeys,
        tables: isEmptyArray(tables) ? [] : tables,
        charts: isEmptyArray(charts) ? [] : charts
      });

    return { template_id: updatedTemplate._id };
  },

  deleteTemplate: async ({
    id
  }) => {
    const deletedTemplate = await ReportTemplate
      .findOne({
        _id: id,
        typeKey: 'custom'
      });

    if (deletedTemplate) {
      await ReportTemplate.deleteOne({ _id: id });
      return { template_id: deletedTemplate._id };
    }
    return { template_id: null };
  }
}