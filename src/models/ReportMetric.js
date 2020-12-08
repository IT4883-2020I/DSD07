import mongoose from 'mongoose';

const reportMetricSchema = new mongoose.Schema({
  type: String,
  sent: Number,
  accepted: Number,
  reviewing: Number
}, {
  versionKey: false
});

const ReportMetric = mongoose.model('ReportMetric', reportMetricSchema, 'rp_metrics');

export default ReportMetric;
