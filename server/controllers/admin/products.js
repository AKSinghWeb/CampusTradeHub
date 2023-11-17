const express = require('express')

const adminProductsRouter = express.Router()
const Product = require('../../models/product')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')
const { bucket } = require('../../config/firebase')
const User = require('../../models/user')
// GET all listings
adminProductsRouter.get('/all', adminAuthMiddleware, async (req, res) => {
  try {
    const products = await Product.find({})
      .populate({ path: 'user', select: 'name username email' })
      .sort({
        updatedAt: -1,
      })

    if (!products) {
      return res.status(404).json({ message: 'No Products not found' })
    }

    res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

// GET all pending listings for admin review
adminProductsRouter.get('/', adminAuthMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ status: 'pending' })
      .populate({ path: 'user', select: 'name username email' })
      .sort({
        updatedAt: -1,
      })

    if (!products) {
      return res.status(404).json({ message: 'No Products not found' })
    }

    res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Approve a product by ID
adminProductsRouter.put(
  '/approve/:productId',
  adminAuthMiddleware,
  async (req, res) => {
    const { productId } = req.params

    try {
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      product.status = 'approved'
      await product.save()
      await User.findByIdAndUpdate(product.user, {
        $push: { products: product._id },
      })

      res.status(200).json(product)
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

// Reject a product by ID
adminProductsRouter.put(
  '/reject/:productId',
  adminAuthMiddleware,
  async (req, res) => {
    const { productId } = req.params

    try {
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      product.approved = false
      product.status = 'rejected'
      await product.save()

      res.status(200).json(product)
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

// Get details of a specific listing for admin review
adminProductsRouter.get(
  '/:productId',
  adminAuthMiddleware,
  async (req, res) => {
    const { productId } = req.params

    try {
      const product = await Product.findById(productId).populate('user')

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      res.status(200).json(product)
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

// Delete a product by ID

adminProductsRouter.delete(
  '/:productId',
  adminAuthMiddleware,
  async (req, res) => {
    const { productId } = req.params

    try {
      const product = await Product.findById(productId)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      if (product.images) {
        const filePath = `products-images/${product.images.split('%2F')[1]}`
        console.log(filePath)
        await bucket.file(filePath).delete()
      }
      await Product.findByIdAndDelete(productId)
      res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

module.exports = adminProductsRouter
