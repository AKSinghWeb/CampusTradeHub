// route to get stats

const statsRouter = require('express').Router()
const Product = require('../../models/product')
const User = require('../../models/user')
const Report = require('../../models/report')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

// Get stats for admin
statsRouter.get('/', adminAuthMiddleware, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ status: 'approved' })
    const pendingProducts = await Product.countDocuments({ status: 'pending' })
    const users = await User.countDocuments({ role: 'user' })
    const reports = await Report.countDocuments({})
    res.status(200).json({ totalProducts, pendingProducts, users, reports })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = statsRouter
