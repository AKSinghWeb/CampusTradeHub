const productRouter = require('express').Router()
const { upload } = require('../config/multerConfig')
const { bucket } = require('../config/firebase')
const Product = require('../models/product')
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware')
const Offer = require('../models/offer')
const User = require('../models/user')

productRouter.get('/', async (req, res) => {
  // add a wait time of 5 seconds

  try {
    const products = await Product.find({ status: 'approved' }).sort({
      updatedAt: -1,
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

    // Split the query into an array of words
    const queryWords = q.split(/\s+/).filter((word) => word.length > 0)

    // Create an array of case-insensitive regular expressions for each word
    const regexArray = queryWords.map((word) => new RegExp(word, 'i'))

    // Use $and to match all conditions
    const products = await Product.find({
      $and: [
        {
          $or: [
            { title: { $in: regexArray } },
            { description: { $in: regexArray } },
            { category: { $in: regexArray } },
            { location: { $in: regexArray } },
          ],
        },
        { status: 'approved' },
      ],
    }).sort({ updatedAt: -1 })

    res.status(200).json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Get products for a specific user including pending and rejected offers
productRouter.get('/user', userAuthMiddleware, async (req, res) => {
  console.log(req.user._id)
  try {
    const products = await Product.find({ user: req.user._id }).sort({
      updatedAt: -1,
    })

    res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
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
    }).sort({ updatedAt: -1 })

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

productRouter.get('/count/:limit', async (req, res) => {
  const { limit } = req.params

  try {
    const products = await Product.find({ status: 'approved' })
      .limit(parseInt(limit, 10))
      .sort({ updatedAt: -1 })

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

    if (!title || !description || !category || !location) {
      return res
        .status(400)
        .json({ error: 'Missing required fields for product data' })
    }

    if (category !== 'Donations' && !price) {
      return res.status(400).json({ error: 'Missing price for product' })
    }

    try {
      const newProduct = new Product({
        title,
        description,
        price: category === 'Donations' ? 0 : price,
        category,
        location,
        user: req.user._id,
      })

      if (req.file) {
        const { file } = req
        const fileName = `products-images/productImage-${
          newProduct._id
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
          const publicUrl = fileUpload.publicUrl()
          newProduct.images = publicUrl // Save the image URL in the product document
          const product = await newProduct.save()
          res.status(200).json(product)
        })

        blobStream.end(file.buffer)
      } else {
        // If no file is present, save the product without an image
        const product = await newProduct.save()

        res.status(200).json(product)
      }
    } catch (error) {
      console.log(error)

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
  '/availability/:productId',
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

// Update Product
productRouter.put(
  '/:productId',
  userAuthMiddleware,
  upload.single('productImage'),
  async (req, res) => {
    const { productId } = req.params
    const { title, description, price, category, location } = req.body

    if (!title || !description || !price || !category || !location) {
      return res
        .status(400)
        .json({ error: 'Missing required fields for product data' })
    }

    try {
      const product = await Product.findById(productId)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      if (product.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: 'Forbidden.' })
      }

      product.title = title
      product.description = description
      product.category = category
      product.price = product.category === 'Donations' ? 0 : price
      product.location = location

      if (req.file) {
        const { file } = req
        const fileName = `products-images/productImage-${
          product._id
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
          const publicUrl = fileUpload.publicUrl()
          const oldProductPicture = product.images
          product.images = publicUrl // Save the image URL in the product document
          product.status = 'pending'
          await product.save() // Save the product with the image URL

          if (oldProductPicture) {
            const filePath = `products-images/${
              oldProductPicture.split('%2F')[1]
            }`
            await bucket.file(filePath).delete()
          }

          await Offer.deleteMany({ productId }) // Delete all offers for the product
          // delte the product from user products array
          await User.findByIdAndUpdate(req.user._id, {
            $pull: { products: productId },
          })
          res.status(200).json(product)
        })

        blobStream.end(file.buffer)
      } else {
        // If no file is present, save the product without an image
        product.status = 'pending'
        await product.save()
        await Offer.deleteMany({ productId }) // Delete all offers for the product
        // delte the product from user products array
        await User.findByIdAndUpdate(req.user._id, {
          $pull: { products: productId },
        })
        res.status(200).json(product)
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    return res.status(200)
  }
)

productRouter.delete('/:productId', userAuthMiddleware, async (req, res) => {
  const { productId } = req.params

  try {
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    if (req.user.role === 'admin') {
      await Product.findByIdAndDelete(productId)

      await Offer.deleteMany({ productId })

      if (product.images) {
        const filePath = `products-images/${product.images.split('%2F')[1]}`
        console.log(filePath)
        await bucket.file(filePath).delete()
      }

      return res.status(200).json({ message: 'Product deleted successfully' })
    }
    if (product.user.toString() === req.user._id.toString()) {
      await Product.findByIdAndDelete(productId)

      await Offer.deleteMany({ productId })

      if (product.images) {
        const filePath = `products-images/${product.images.split('%2F')[1]}`
        console.log(filePath)
        await bucket.file(filePath).delete()
      }

      return res.status(200).json({ message: 'Product deleted successfully' })
    }
    return res.status(401).json({ error: 'Forbidden.' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = productRouter
