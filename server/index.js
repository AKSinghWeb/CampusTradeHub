const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()

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

app.get('/api/users', async (req, res) => {
  const data = await User.find({})
  res.json(data)
})

app.use(cors())
app.use(express.json())

app.post('/api/users', async (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const name = req.body.name
  const contactInfo = req.body.contactInfo
  const averageRating = req.body.averageRating
  const role = req.body.role

  const passwordHash = await bcrypt.hash(password,10)

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
    console.error('Someting went wrong',err)
    res.status(500).json({error: 'Internal Server Error'})
  
  }
})

port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
