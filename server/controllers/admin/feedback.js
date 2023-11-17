// route for admin to view feedback and manage feedback

const express = require('express')

const adminFeedbackRouter = express.Router()
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')
const Feedback = require('../../models/Feedback')

// GET all feedback
adminFeedbackRouter.get('/', adminAuthMiddleware, async (req, res) => {
  try {
    const feedback = await Feedback.find({}).sort({
      timestamp: -1,
    })

    if (!feedback) {
      return res.status(404).json({ message: 'No feedback found' })
    }

    res.status(200).json(feedback)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Delete a feedback by ID
adminFeedbackRouter.delete(
  '/:feedbackId',
  adminAuthMiddleware,
  async (req, res) => {
    const { feedbackId } = req.params

    try {
      const feedback = await Feedback.findById(feedbackId)
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' })
      }

      await feedback.remove()

      res.status(200).json({ message: 'Feedback deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

module.exports = adminFeedbackRouter
