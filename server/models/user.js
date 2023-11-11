const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: '' },
    contactInfo: { type: String, default: '' },
    location: { type: String, default: '' },
    profilePicture: {
      type: String,
      default: 'https://avatar.iran.liara.run/public/79',
    },
    averageRating: { type: Number, default: 0 },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    reviewCount: { type: Number, default: 0 },
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
