/* eslint-disable no-underscore-dangle */
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username } = req.body
  const { password } = req.body

  console.log(req.body)

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ error: 'user not found' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid username or  password' })
    }

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
      message: 'Login Successful',
      token,
      user,
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = loginRouter
