// routes/offerRoutes.js
const express = require('express')

const offerRouter = express.Router()
const authMiddleware = require('../middlewares/userAuthMiddleware')
const offerController = require('./offerController')

// POST: Create a new offer for a product
offerRouter.post('/', authMiddleware, async (req, res) => {
  const { productId, amount, description } = req.body
  const buyerId = req.user._id // Assuming user ID is stored in the req.user object

  try {
    const offerResult = await offerController.createOffer(
      productId,
      buyerId,
      amount,
      description
    )

    if (offerResult.success) {
      res
        .status(200)
        .json({ message: offerResult.message, offer: offerResult.offer })
    } else {
      res.status(500).json({ error: offerResult.message })
    }
  } catch (error) {
    console.error('Error creating offer:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// POST: Respond to an offer (accept, reject)
offerRouter.post('/:offerId/respond', authMiddleware, async (req, res) => {
  const { offerId } = req.params
  const { response, additionalInfo } = req.body
  const sellerId = req.user._id // Assuming user ID is stored in the req.user object

  try {
    const responseResult = await offerController.respondToOffer(
      offerId,
      response,
      additionalInfo,
      sellerId
    )

    if (responseResult.success) {
      res.json({ message: responseResult.message })
    } else {
      res.status(404).json({ error: responseResult.message })
    }
  } catch (error) {
    console.error('Error responding to offer:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// POST: Send a message within an offer
offerRouter.post('/:offerId/messages', authMiddleware, async (req, res) => {
  const { offerId } = req.params
  const { content } = req.body
  const senderId = req.user._id // Assuming user ID is stored in the req.user object

  try {
    const messageResult = await offerController.sendMessage(
      offerId,
      senderId,
      content
    )

    if (messageResult.success) {
      res.json({
        message: messageResult.message,
        newMessage: messageResult.newMessage,
      })
    } else {
      res.status(404).json({ error: messageResult.message })
    }
  } catch (error) {
    console.error('Error sending message:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// GET: Get messages within an offer
offerRouter.get('/:offerId/messages', authMiddleware, async (req, res) => {
  const { offerId } = req.params

  try {
    const messagesResult = await offerController.getMessages(offerId)

    if (messagesResult.success) {
      res.json(messagesResult.messages)
    } else {
      res.status(404).json({ error: messagesResult.message })
    }
  } catch (error) {
    console.error('Error retrieving messages:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = offerRouter
