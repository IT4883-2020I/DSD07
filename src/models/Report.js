import mongoose from 'mongoose';
import { tepmplateSectionSchema } from './ReportTemplate.js';
import ReportComment from './ReportComment.js';


const { Types } = mongoose;

const reportSchema = new mongoose.Schema({
  sections: [tepmplateSectionSchema],
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
  updatedAt: Date
}, {
  versionKey: false
});

const Report = mongoose.model('Report', reportSchema, 'reports');

export default Report;
