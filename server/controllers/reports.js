// routes to report user and product
const express = require('express')

const reportRouter = express.Router()
const Report = require('../models/report')
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

// Post a report for a user
reportRouter.post('/user', userAuthMiddleware, async (req, res) => {
  try {
    const { reportedUser, reportType, reason, description } = req.body
    const report = new Report({
      reporter: req.user._id,
      reportedUser,
      reportType,
      reason,
      description,
    })
    await report.save()
    res.status(201).json({ message: 'Report submitted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Post a report for a product
reportRouter.post('/product', userAuthMiddleware, async (req, res) => {
  try {
    const { reportedProduct, reportType, reason, description } = req.body
    const report = new Report({
      reporter: req.user._id,
      reportedProduct,
      reportType,
      reason,
      description,
    })
    await report.save()
    res.status(201).json({ message: 'Report submitted successfully', report })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all reports for a user
module.exports = reportRouter
