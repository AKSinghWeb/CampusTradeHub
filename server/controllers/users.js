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
        const fileName = `profile-pictures/profilePicture-${
          user._id
        }-${Date.now()}`
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
          const oldProfilePicture = user.profilePicture

          if (oldProfilePicture) {
            const filePath = `profile-pictures/${
              oldProfilePicture.split('%2F')[1]
            }`
            await bucket.file(filePath).delete()
          }

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

// Update Profile (User)
userRouter.put('/my-profile', userAuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const { name, email, bio, contactInfo, location } = req.body

    user.name = name || user.name
    user.email = email || user.email
    user.bio = bio || user.bio
    user.contactInfo = contactInfo || user.contactInfo
    user.location = location || user.location

    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
  } catch (err) {
    console.error('Error updating profile:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Update Username (User)
userRouter.put('/username', userAuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const { username } = req.body

    if (username === user.username) {
      return res.status(400).json({ error: 'Username same as before.' })
    }

    const existingUser = await User.find({ username })

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username already exists.' })
    }

    user.username = username || user.username

    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
  } catch (err) {
    console.error('Error updating username:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Update Password (User)
userRouter.put('/password', userAuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const { password, newPassword } = req.body

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Incorrect old password.' })
    }

    const passwordHash = await bcrypt.hash(newPassword, 10)

    user.passwordHash = passwordHash

    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
  } catch (err) {
    console.error('Error updating password:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Delete Profile Picture (User)
userRouter.delete('/profile-picture', userAuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const oldProfilePicture = user.profilePicture

    if (!oldProfilePicture) {
      return res.status(400).json({ error: 'No profile picture to delete.' })
    }

    const filePath = `profile-pictures/${oldProfilePicture.split('%2F')[1]}`
    await bucket.file(filePath).delete()

    user.profilePicture = ''
    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
  } catch (err) {
    console.error('Error deleting profile picture:', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = userRouter
