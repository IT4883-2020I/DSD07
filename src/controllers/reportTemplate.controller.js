import ReportTemplate from '../models/ReportTemplate.js';
import { isEmptyArray } from '../utils/commonUtils.js';

function formatSection(section) {
  const { type, uniqueId, ...data } = section;
  if (type === 'text') return section;
  if (type === 'text-key') {
    const { text, dataSource, ...textDetail } = data;
    const keyNames = text.match(/\$[\w\d]+/g);
    const keys = {};
    keyNames.forEach(key => keys[`${key.slice(1)}`] = null)
    return {
      type,
      text,
      keys,
      dataSource: dataSource || null,
      ...textDetail
    }
  }
  if (type === 'table') {
    const { headers, records, dataSource } = data;
    return {
      type,
      headers: headers && Array.isArray(headers) ? headers : [],
      records: records && Array.isArray(records) ? records : [],
      dataSource: dataSource || null
    }
  }
  if (type === 'image') {
    const { alt, url } = data;
    return {
      type,
      alt: alt || null,
      url: url || null
    }
  }
  if (type === 'predefined-section') {
    const { format, keys } = data;
    return {
      type,
      format,
      keys: keys || {}
    }
  }
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
    sections
  }) => {
    const newTemplate = await ReportTemplate
      .create({
        type,
        typeKey: 'custom',
        sections: sections.map(section => formatSection(section))
      });

    return { template_id: newTemplate._id };
  },

  updateTemplate: async ({
    id,
    type,
    sections
  }) => {
    const updates = {};
    if (type) updates.type = type;
    if (sections) updates.sections = sections;
    const updatedTemplate = await ReportTemplate
      .findByIdAndUpdate(id, updates);

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