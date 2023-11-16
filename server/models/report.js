// Model to store report data

const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reportedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reportedProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  reportType: String,
  reason: String,
  description: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
})

const Report = mongoose.model('Report', reportSchema)

module.exports = Report
