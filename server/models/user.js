const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    contactInfo: { type: String, default: '' },
    profilePicture: {
      type: String,
      default: 'https://avatar.iran.liara.run/public/79',
    },
    averageRating: { type: Number, default: 0 },
    role: { type: String, required: true, default: 'user' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
)

// Exclude __v from toJSON output
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
