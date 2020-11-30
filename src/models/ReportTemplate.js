import mongoose from 'mongoose';

const tepmplateSectionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'text-key', 'table', 'image']
  },
  format: {
    type: String,
    required: false,
    enum: ['header', 'paragraph', 'quote']
  },
  text: {
    type: String,
    required: false
  },
  keys: {
    type: Object,
    required: false
  },
  headers: {
    type: [String],
    required: false
  },
  records: {
    type: [String],
    required: false
  },
  alt: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  }
}, {
  _id: false,
  versionKey: false
});

export {
  tepmplateSectionSchema
}

const reportTemplateSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  typeKey: {
    type: String,
    required: true
  },
  sections: {
    type: [tepmplateSectionSchema]
  }
}, {
  versionKey: false
});

const ReportTemplate = mongoose.model('ReportTemplate', reportTemplateSchema, 'rp_templates');
export default ReportTemplate;
