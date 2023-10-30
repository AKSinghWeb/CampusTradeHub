// controllers/offerController.js
const Offer = require('../models/offer')
const Product = require('../models/product')

// Get all offers for a user
const getOffers = async (userId) => {
  try {
    const offers = await Offer.find({ sellerId: userId })
      .populate('productId', 'title images')
      .populate('buyerId', 'username name profilePicture averageRating')
      .sort({
        createdAt: -1,
      })

    const filteredOffers = offers.map((offer) => {
      if (offer.status === 'pending' || offer.status === 'rejected') {
        // If the offer is pending, omit contact information
        return {
          _id: offer._id,
          product: offer.productId,
          offerPrice: offer.offerPrice,
          description: offer.description,
          status: offer.status,
          buyer: offer.buyerId,
        }
      }
      // If the offer is not pending, include all fields
      return {
        ...offer.toObject(),
        product: offer.productId,
        buyer: offer.buyerId,
      }
    })

    return { success: true, offers: filteredOffers }
  } catch (error) {
    console.error('Error retrieving offers:', error)
    return { success: false, message: 'Internal Server Error' }
  }
}

// Get all offers sent by a user
const getSentOffers = async (userId) => {
  try {
    const offers = await Offer.find({ buyerId: userId })
      .populate('productId', 'title images')
      .populate('sellerId', 'username name profilePicture averageRating')
      .sort({
        createdAt: -1,
      })

    const filteredOffers = offers.map((offer) => {
      if (offer.status === 'pending' || offer.status === 'rejected') {
        // If the offer is pending, omit contact information
        return {
          _id: offer._id,
          product: offer.productId,
          offerPrice: offer.offerPrice,
          description: offer.description,
          status: offer.status,
          seller: offer.sellerId,
        }
      }

      // If the offer is not pending, include all fields
      return {
        ...offer.toObject(),
        product: offer.productId,
        seller: offer.sellerId,
      }
    })

    return { success: true, offers: filteredOffers }
  } catch (error) {
    console.error('Error retrieving offers:', error)
    return { success: false, message: 'Internal Server Error' }
  }
}

// Create a new offer
const createOffer = async (
  productId,
  buyerId,
  offerPrice,
  description,
  mobileNumber,
  alternateMobileNumber,
  email
) => {
  try {
    const product = await Product.findById(productId)
    const sellerId = product.user

    if (!product) {
      return { success: false, message: 'Product not found' }
    }

    if (product.user.toString() === buyerId.toString()) {
      return {
        success: false,
        message: 'You cannot make an offer on your own product',
      }
    }

    // Check if the user has already made an offer on this product
    const existingOffer = await Offer.findOne({
      productId,
      buyerId,
    })

    if (existingOffer && existingOffer.status === 'pending') {
      return {
        success: false,

        message: 'You have already made an offer on this product',
      }
    }

    const newOffer = new Offer({
      productId,
      buyerId,
      offerPrice,
      description,
      sellerId,
      status: 'pending',
      mobileNumber,
    })

    if (alternateMobileNumber) {
      newOffer.alternateMobileNumber = alternateMobileNumber
    }

    if (email) {
      newOffer.email = email
    }

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
const respondToOffer = async (
  offerId,
  response,
  contactInformation,
  sellerId
) => {
  try {
    const offer = await Offer.findById(offerId)
    console.log('offer', response, contactInformation)

    if (!offer) {
      return { success: false, message: 'Offer not found' }
    }

    // Ensure that the user responding is the seller associated with the offer
    if (sellerId.toString() !== offer.sellerId.toString()) {
      return {
        success: false,
        message: 'Unauthorized: Only the seller can respond to this offer',
      }
    }

    offer.status = response

    if (response === 'accepted') {
      offer.contactInformation.mobileNumber = contactInformation.mobileNumber
      offer.contactInformation.alternateMobileNumber =
        contactInformation.alternateMobileNumber
      offer.contactInformation.email = contactInformation.email
    }
    console.log(offer)
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
  getOffers,
  getSentOffers,
  // ... other offer controller functions
}
