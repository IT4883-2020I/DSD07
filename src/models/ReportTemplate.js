import mongoose from 'mongoose';

const { Types } = mongoose;

const reportTemplateSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    default: ''
  },
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
  openning: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['table', 'section', 'chart', 'mixture'],
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
});

const ReportTemplate = mongoose.model('ReportTemplate', reportTemplateSchema, 'rp_templates');
export default ReportTemplate;
