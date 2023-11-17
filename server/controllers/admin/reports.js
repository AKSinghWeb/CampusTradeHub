// routes for admin to view reports and manage reports

const express = require('express')

const adminReportsRouter = express.Router()
const Report = require('../../models/report')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

// GET all reports
adminReportsRouter.get('/', adminAuthMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate({ path: 'reporter', select: 'name username email' })
      .populate({ path: 'reportedUser', select: 'name username email' })
      .populate({ path: 'reportedProduct', select: 'title' })
      .sort({
        timestamp: -1,
      })

    if (!reports) {
      return res.status(404).json({ message: 'No reports found' })
    }

    res.status(200).json(reports)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Close a report by ID
adminReportsRouter.put(
  '/resolve/:reportId',
  adminAuthMiddleware,
  async (req, res) => {
    const { reportId } = req.params

    try {
      const report = await Report.findById(reportId)
      if (!report) {
        return res.status(404).json({ message: 'Report not found' })
      }

      report.status = 'resolved'
      await report.save()

      res.status(200).json({ message: 'Report closed successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

// Delete a report by ID
adminReportsRouter.delete(
  '/delete/:reportId',
  adminAuthMiddleware,
  async (req, res) => {
    const { reportId } = req.params

    try {
      const report = await Report.findById(reportId)
      if (!report) {
        return res.status(404).json({ message: 'Report not found' })
      }

      await report.remove()

      res.status(200).json({ message: 'Report deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

module.exports = adminReportsRouter
