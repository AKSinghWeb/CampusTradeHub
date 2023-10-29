require('dotenv').config()
require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')

const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const productRouter = require('./controllers/products')
const adminProductsRouter = require('./controllers/admin/products')
const offerRouter = require('./controllers/offers')

const app = express()

mongoose
  .connect('mongodb://127.0.0.1:27017/CAMPUSTRADEHUB')
  .then(() => console.log('connected to mongodb'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/products/offers', offerRouter)

app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
  next(err)
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
