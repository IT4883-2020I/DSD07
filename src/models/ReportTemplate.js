import mongoose from 'mongoose';

const reportTemplateSchema = new mongoose.Schema({
  url: String,
  type: {
    type: String,
    required: true
  },
  typeKey: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  opening: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['table', 'section', 'chart', 'mixture', 'none'],
    required: true
  },
  sectionKeys: {
    type: [String],
    required: false
  },
  tables: {
    type: [Object],
    required: false
  },
  charts: {
    type: [String],
    required: false
  }
}, {
  versionKey: false
});

const ReportTemplate = mongoose.model('ReportTemplate', reportTemplateSchema, 'rp_templates');
export default ReportTemplate;
