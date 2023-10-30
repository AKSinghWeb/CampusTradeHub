// const mongoose = require('mongoose')

// const productSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String },
//     images: {
//       type: String,
//       default: `https://i.dummyjson.com/data/products/5/thumbnail.jpg`,
//     },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     location: { type: String, required: true },
//     status: { type: String, required: true, default: 'pending' },
//     approved: { type: Boolean, default: false },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//   },
//   { timestamps: true }
// )

// productSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret.id = ret._id
//     delete ret._id
//     delete ret.__v
//   },
// })

// const Product = mongoose.model('Product', productSchema)

// module.exports = Product

const mongoose = require('mongoose')

// Function to generate a random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    images: {
      type: String,
      default() {
        const random = getRandomNumber(1, 100) // Adjust the range as needed
        return `https://i.dummyjson.com/data/products/${random}/thumbnail.jpg`
      },
    },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
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
