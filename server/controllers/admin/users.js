const express = require('express')

const adminUsersRouter = express.Router()
const User = require('../../models/user')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')
const bucket = require('../../config/firebase')
const Product = require('../../models/product')

// GET all users
adminUsersRouter.get('/', adminAuthMiddleware, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort({
      updatedAt: -1,
    })

    if (!users) {
      return res.status(404).json({ message: 'No users found' })
    }

    res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Delete a user by ID
adminUsersRouter.delete('/:userId', adminAuthMiddleware, async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await User.findByIdAndDelete(userId)

    // Delete user's profile picture from Firebase Storage
    const filePath = `profile-images/${user.profilePicture.split('%2F')[1]}`
    await bucket.file(filePath).delete()

    // Delete User's listings
    await Product.deleteMany({ user: userId })

    res.status(200).json({ message: 'User deleted' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = adminUsersRouter
