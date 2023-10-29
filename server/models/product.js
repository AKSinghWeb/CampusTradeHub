const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    images: { type: String, default: 'https://placehold.co/400/' },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true, default: 'available' },
    approved: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

productSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
