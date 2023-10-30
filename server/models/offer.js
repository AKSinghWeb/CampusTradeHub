// models/offer.js
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
})

const offerSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    offerPrice: { type: Number, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      required: true,
    },
    buyerDescrption: { type: String },
    mobileNumber: { type: String, required: true }, // Add mobile number field
    alternateMobileNumber: { type: String }, // Add alternate mobile number field
    email: { type: String },
    contactInformation: {
      mobileNumber: String,
      alternateMobileNumber: String,
      email: String,
    },
    messages: [messageSchema],
  },
  { timestamps: true }
)

const Offer = mongoose.model('Offer', offerSchema)

module.exports = Offer
