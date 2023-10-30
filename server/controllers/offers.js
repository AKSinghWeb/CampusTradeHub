// routes/offerRoutes.js
const express = require('express')

const offerRouter = express.Router()
const authMiddleware = require('../middlewares/userAuthMiddleware')
const offerController = require('./offerController')


// GET: All of a user's offers
offerRouter.get('/all-offers', authMiddleware, async (req, res) => {
  const userId = req.user._id // Assuming user ID is stored in the req.user object

  console.log('userId', userId)

  try {
    const offersResult = await offerController.getOffers(userId)

    if (offersResult.success) {
      res.status(200).json(offersResult.offers)
    } else {
      res.status(404).json({ error: offersResult.message })
    }
  } catch (error) {
    console.error('Error retrieving offers:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// GET: All offers sent by a user
offerRouter.get('/sent-offers', authMiddleware, async (req, res) => {
  const userId = req.user._id // Assuming user ID is stored in the req.user object

  try {
    const offersResult = await offerController.getSentOffers(userId)

    if (offersResult.success) {
      res.status(200).json(offersResult.offers)
    } else {
      res.status(404).json({ error: offersResult.message })
    }
  } catch (error) {
    console.error('Error retrieving offers:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


// POST: Create a new offer for a product
offerRouter.post('/', authMiddleware, async (req, res) => {
  const {
    productId,
    offerPrice,
    description,
    mobileNumber,
    alternateMobileNumber,
    email,
  } = req.body
  const buyerId = req.user._id // Assuming user ID is stored in the req.user object

  try {
    const offerResult = await offerController.createOffer(
      productId,
      buyerId,
      offerPrice,
      description,
      mobileNumber,
      alternateMobileNumber,
      email
    )

    if (offerResult.success) {
      res.status(201).json({
        success: true,
        message: offerResult.message,
        offer: offerResult.offer,
      })
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
  const { response, contactInformation } = req.body
  const sellerId = req.user._id // Assuming user ID is stored in the req.user object

  try {
    const responseResult = await offerController.respondToOffer(
      offerId,
      response,
      contactInformation,
      sellerId
    )

    if (responseResult.success) {
      res.json({ success: true, message: responseResult.message })
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
    res.status(500).json({ error: 'Internal Server a Error' })
  }
})




module.exports = offerRouter
