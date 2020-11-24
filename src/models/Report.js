import mongoose from 'mongoose';
import ReportComment from './ReportComment.js';
import ReportTemplate from './ReportTemplate.js';


const { Types } = mongoose;

const reportSchema = new mongoose.Schema({
  tables: [[Object]],
  keys: Object,
  sectionKeys: [String],
  charts: [String],
  userId: Number,
  reviewerId: Number,
  comments: [{
    type: Types.ObjectId,
    ref: 'ReportComment'
  }],
  isAccepted: Boolean,
  status: String,
  name: String,
  createdAt: Date,
  updatedAt: Date,
  template:  {
    type: Types.ObjectId,
    ref: 'ReportTemplate'
  }
}, {
  versionKey: false
});

const Report = mongoose.model('Report', reportSchema, 'reports');

export default Report;
