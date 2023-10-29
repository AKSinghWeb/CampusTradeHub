const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware')
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

// Sign Up
userRouter.post('/', async (req, res) => {
  const { username, email, password, name } = req.body
  console.log('req.body', req.body)
  // Validation
  if (!username || !email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      email,
      passwordHash,
      name,
    })

    await user.save()

    const tokenData = {
      username: user.username,
      role: user.role,
      uid: user._id,
    }

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: '3d',
    })

    res.status(200).json({
      success: true,
      message: 'Signup Successful',
      token,
      user,
    })
  } catch (err) {
    console.error('Error creating user:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

userRouter.get('/', adminAuthMiddleware, async (req, res) => {
  try {
    const data = await User.find({})
    res.json(data)
  } catch (err) {
    console.error('Error retrieving users:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

userRouter.get('/my-profile', userAuthMiddleware, async (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (err) {
    console.error('Error retrieving user:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = userRouter
