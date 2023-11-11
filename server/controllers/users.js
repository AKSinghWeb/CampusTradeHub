const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { upload } = require('../config/multerConfig')
const { bucket } = require('../config/firebase')
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

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    console.error('Error retrieving user:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Update Profile Picture (User)
userRouter.put(
  '/profile-picture',
  userAuthMiddleware,
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id)

      if (!user) {
        return res.status(404).json({ error: 'User not found.' })
      }

      if (req.file) {
        const { file } = req
        const fileName = `profile-pictures/profilePicture-${user._id}`
        const fileUpload = bucket.file(fileName)

        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        })

        blobStream.on('error', (error) => {
          res.status(500).send(`Error uploading file: ${error.message}`)
        })

        blobStream.on('finish', async () => {
          // The public URL can be used to directly access the file.
          const url = fileUpload.publicUrl()

          user.profilePicture = url
          const updatedUser = await user.save() // Save the product with the image URL

          res.status(200).json(updatedUser)
        })

        blobStream.end(file.buffer)
      } else {
        // If no file is present, save the product without an image
        const updatedUser = await user.save()

        res.status(200).json(updatedUser)
      }
    } catch (err) {
      console.error('Error updating profile picture:', err.message)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
)

module.exports = userRouter
