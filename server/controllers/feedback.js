// route to post feedback

const express = require('express')

const feedbackRouter = express.Router()
const Feedback = require('../models/Feedback')

// POST feedback
feedbackRouter.post('/', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill all fields' })
  }

  try {
    const feedback = new Feedback({
      name,
      email,
      message,
    })

    await feedback.save()

    res.status(201).json({ message: 'Feedback submitted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = feedbackRouter
