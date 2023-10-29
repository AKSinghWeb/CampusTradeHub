const productRouter = require('express').Router()
const { upload } = require('../config/multerConfig')
// const path = require('path')
const { bucket } = require('../config/firebase')
const Product = require('../models/product')
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware')
const User = require('../models/user')

productRouter.get('/', async (req, res) => {
  // add a wait time of 5 seconds

  try {
    const products = await Product.find({ status: 'approved' }).sort({
      createdAt: -1,
    })

    res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

// usage example: /api/products/search?q=macbook
productRouter.get('/search', async (req, res) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({ error: 'Search query is required.' })
    }

    // Use a case-insensitive regular expression for the search query
    const regex = new RegExp(q, 'i')

    // sorted by latest products

    const products = await Product.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
        { location: { $regex: regex } },
      ],
      status: 'approved',
    }).sort({ createdAt: -1 })

    res.status(200).json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

productRouter.get('/:productId', async (req, res) => {
  const { productId } = req.params

  try {
    const product = await Product.findById(productId).populate({
      path: 'user',
      select: 'username name profilePicture averageRating',
    })

    if (!product || product.status !== 'approved') {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.status(200).json(product)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

productRouter.get('/category/:category', async (req, res) => {
  const { category } = req.params

  try {
    // make case insensitive search
    const products = await Product.find({
      category: { $regex: new RegExp(category, 'i') },
      status: 'approved',
    }).sort({ createdAt: -1 })

    if (!products) {
      return res
        .status(404)
        .json({ error: 'No products with the specified category found' })
    }

    res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

productRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const products = await Product.find({ user: userId })

    if (!products) {
      return res
        .status(404)
        .json({ error: 'No products with the specified user found' })
    }

    res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

productRouter.get('/count/:limit', async (req, res) => {
  const { limit } = req.params

  try {
    const products = await Product.find({ status: 'approved' })
      .limit(parseInt(limit, 10))
      .sort({ createdAt: -1 })

    if (!products) {
      return res.status(404).json({ error: 'No products found' })
    }

    res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

productRouter.post(
  '/',
  userAuthMiddleware,
  upload.single('productImage'),
  async (req, res) => {
    const { title, description, price, category, location } = req.body

    if (!title || !description || !price || !category || !location) {
      return res
        .status(400)
        .json({ error: 'Missing required fields for product data' })
    }

    try {
      const newProduct = new Product({
        title,
        description,
        price,
        category,
        location,
        user: req.user._id,
      })

      if (req.file) {
        const { file } = req
        const fileName = `products-images/${Date.now()}-${newProduct._id}`
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
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
          newProduct.images = publicUrl // Save the image URL in the product document
          const product = await newProduct.save() // Save the product with the image URL
          await User.findByIdAndUpdate(req.user._id, {
            $push: { products: product._id },
          }) // Add the product to the user's products array
          res.status(200).json(product)
        })

        blobStream.end(file.buffer)
      } else {
        // If no file is present, save the product without an image
        const product = await newProduct.save()
        await User.findByIdAndUpdate(req.user._id, {
          $push: { products: product._id },
        })
        res.status(200).json(product)
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    return res.status(200)
  }
)

productRouter.put(
  '/approve-status/:productId',
  adminAuthMiddleware,
  async (req, res) => {
    const { productId } = req.params
    const { approved } = req.body

    try {
      const product = await Product.findById(productId)

      if (!product) {
        return res.status(404).json({ message: 'Product not found.' })
      }

      product.approved = approved

      await product.save()
      res.status(200).json(product)
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

productRouter.put(
  '/status/:productId',
  userAuthMiddleware,
  async (req, res) => {
    const { productId } = req.params
    const { status } = req.body

    try {
      const product = await Product.findById(productId)

      if (!product) {
        return res.status(404).json({ message: 'Product not found.' })
      }

      if (product.user.toString() === req.user._id.toString()) {
        product.status = status
        await product.save()
        return res.status(200).json(product)
      }
      return res.status(401).json({ error: 'Forbidden.' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

productRouter.put('/info/:productId', userAuthMiddleware, async (req, res) => {
  const updatedInfo = req.body

  const { productId } = req.params

  try {
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    if (product.user.toString() === req.user._id.toString()) {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          ...updatedInfo,
        },
        { new: true }
      )
      return res.status(200).json(updatedProduct)
    }
    return res.status(401).json({ error: 'Forbidden.' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

productRouter.delete('/:productId', userAuthMiddleware, async (req, res) => {
  const { productId } = req.params

  const product = await Product.findById(productId)

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  if (req.user.role === 'admin') {
    await Product.findByIdAndDelete(productId)
    return res.status(200).json({ message: 'product deleted successfully' })
  }
  if (product.user.toString() === req.user._id.toString()) {
    await Product.findByIdAndDelete(productId)
    return res.status(200).json({ message: 'product deleted successfully' })
  }
  return res.status(401).json({ error: 'Forbidden.' })
})

module.exports = productRouter
