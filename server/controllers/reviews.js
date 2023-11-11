// Router for reviews

const express = require('express')

const reviewRouter = express.Router()
const Review = require('../models/review')
const userAuthMiddleware = require('../middlewares/userAuthMiddleware')
const User = require('../models/user')

// GET /reviews
reviewRouter.get('/', userAuthMiddleware, async (req, res, next) => {
  try {
    const reviews = await Review.find()
    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

// GET /reviews/:id
reviewRouter.get('/:id', userAuthMiddleware, async (req, res, next) => {
  try {
    const review = await Review.find({ revieweeId: req.params.id }).populate(
      'reviewerId',
      {
        name: 1,
        profilePicture: 1,
      }
    )
    res.json(review)
  } catch (error) {
    next(error)
  }
})

// POST /reviews

reviewRouter.post('/', userAuthMiddleware, async (req, res) => {
  try {
    const { revieweeId, rating, description } = req.body

    if (!revieweeId || !rating || !description) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    if (req.user._id.toString() === revieweeId.toString()) {
      return res.status(400).json({ error: 'You can not review yourself' })
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' })
    }

    if (description.length > 400) {
      return res
        .status(400)
        .json({ error: 'Description must be less than 400 characters' })
    }

    const review = new Review({
      reviewerId: req.user._id,
      revieweeId,
      rating,
      description,
    })
    const newReview = await review.save()

    // Update average rating of the reviewee
    const reviewee = await User.findById(revieweeId)
    reviewee.averageRating = (
      (reviewee.averageRating * reviewee.reviewCount + newReview.rating) /
      (reviewee.reviewCount + 1)
    ).toFixed(2)
    reviewee.reviewCount += 1
    await reviewee.save()

    res.status(201).json(newReview)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

// DELETE /reviews/:id, only the reviewee can delete the review
reviewRouter.delete('/:id', userAuthMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    if (review.revieweeId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    await Review.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = reviewRouter
