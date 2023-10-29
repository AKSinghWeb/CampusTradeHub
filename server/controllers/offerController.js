// controllers/offerController.js
const Offer = require('../models/offer')

// Create a new offer
const createOffer = async (productId, buyerId, amount, description) => {
  try {
    const newOffer = new Offer({
      productId,
      buyerId,
      amount,
      description,
      status: 'pending',
    })

    await newOffer.save()
    return {
      success: true,
      message: 'Offer created successfully',
      offer: newOffer,
    }
  } catch (error) {
    console.error('Error creating offer:', error)
    return { success: false, message: 'Internal Server Error' }
  }
}

// Respond to an offer (accept, reject)
const respondToOffer = async (offerId, response, additionalInfo, sellerId) => {
  try {
    const offer = await Offer.findById(offerId)

    if (!offer) {
      return { success: false, message: 'Offer not found' }
    }

    // Ensure that the user responding is the seller associated with the offer
    if (sellerId.toString() !== offer.productId.sellerId.toString()) {
      return {
        success: false,
        message: 'Unauthorized: Only the seller can respond to this offer',
      }
    }

    offer.status = response

    if (response === 'accepted') {
      offer.additionalInfo = additionalInfo
    }

    await offer.save()

    return { success: true, message: 'Offer responded successfully' }
  } catch (error) {
    console.error('Error responding to offer:', error)
    return { success: false, message: 'Internal Server Error' }
  }
}

// Send a message within an offer
const sendMessage = async (offerId, senderId, content) => {
  try {
    const offer = await Offer.findById(offerId)

    if (!offer) {
      return { success: false, message: 'Offer not found' }
    }

    const newMessage = {
      senderId,
      content,
    }

    offer.messages.push(newMessage)
    await offer.save()

    return { success: true, message: 'Message sent successfully', newMessage }
  } catch (error) {
    console.error('Error sending message:', error)
    return { success: false, message: 'Internal Server Error' }
  }
}

// Get messages within an offer
const getMessages = async (offerId) => {
  try {
    const offer = await Offer.findById(offerId)

    if (!offer) {
      return { success: false, message: 'Offer not found' }
    }

    const { messages } = offer
    return { success: true, messages }
  } catch (error) {
    console.error('Error retrieving messages:', error)
    return { success: false, message: 'Internal Server Error' }
  }
}

module.exports = {
  createOffer,
  respondToOffer,
  sendMessage,
  getMessages,
  // ... other offer controller functions
}
