require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')

mongoose
  .connect('mongodb://127.0.0.1:27017/CAMPUSTRADEHUB')
  .then(() => console.log('connected to mongodb'))

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  contactInfo: { type: String },
  profilePicture: { type: String },
  averageRating: { type: Number },
  role: { type: String, required: true },
})

const User = mongoose.model('User', userSchema)

app.use(cors())
app.use(express.json())

// route for regitering user
app.post('/api/users', async (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const name = req.body.name
  const contactInfo = req.body.contactInfo
  const averageRating = req.body.averageRating
  const role = req.body.role

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    const user = new User({
      username: username,
      email: email,
      passwordHash: passwordHash,
      name: name,
      contactInfo: contactInfo,
      averageRating: averageRating,
      role: role,
    })

    await user.save()
    res.status(200).json(user)
  } catch (err) {
    console.error('Someting went wrong', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// route for loggin in
app.post('/api/login', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  console.log(req.body)

  try {
    const user = await User.findOne({ username: username })

    if (!user) {
      return res.json({ error: 'user not found' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordCorrect) {
      return res.json({ error: 'Invalid username or  password' })
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      role: user.role,
    }

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: '6h',
    })

    res.status(200).json({
      success: true,
      message: 'Login Successful',
      token: token,
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

const adminAuthMiddleware = async (req, res,next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }

  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorized. Token missing.' })
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET_KEY)

    const userId = decodedToken.id

    const user = await User.findById(userId)

    // console.log(user)

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (user.role === 'admin') {
      req.user = user
      console.log('user',req.user)
      next()
    } else {
      return res.status(403).json({ error: 'Access denied' })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized. Invalid token.' })
  }
}



app.get('/api/users', adminAuthMiddleware, async (req, res) => {
  try {
    const data = await User.find({})
    res.json(data)
  } catch (error) {
    console.error('Someting went wrong', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
