import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Loader2, Star } from 'lucide-react'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import useApiCall from '@/hooks/useApiCall'
import { reviewsApiService } from '@/services/apiService'

const RateAndReviewCard = ({ userId }) => {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')

  const [newReviewApiCall, loading] = useApiCall(reviewsApiService.createReview)

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating)
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      setSubmitMessage('Please select a rating before submitting.')
      return
    }

    if (!reviewText.trim()) {
      setSubmitMessage('Please write a review before submitting.')
      return
    }

    if (reviewText.length > 400) {
      setSubmitMessage('Review cannot exceed 300 characters.')
      return
    }

    // Perform submission logic here
    const review = {
      revieweeId: userId,
      rating,
      description: reviewText,
    }

    try {
      console.log('review', review)
      const response = await newReviewApiCall(
        'Review Submitted successfully!',
        review
      )
      console.log(response)
    } catch (error) {
      console.error('Review Submission Failed', error)
    }
    const escKeyEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
    })
    document.dispatchEvent(escKeyEvent)
  }
  return (
    <div className="p-2">
      <h2 className="text-lg font-bold mb-2">Rate and Review</h2>
      <div className=" flex items-center ">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              fill={`${star <= rating ? '#f59e0b' : '#d1d5db'}`}
              className={`cursor-pointer ${
                star <= rating ? 'text-yellow-500' : 'text-gray-400'
              }`}
              color=""
              onClick={() => handleStarClick(star)}
            />
          ))}

          <div className="ml-2 mt-1 font-bold text-xl">({rating}/5)</div>
        </div>
      </div>
      <Textarea
        className="mt-4 p-2 w-full rounded"
        placeholder="Write your review for the user (max 400 characters)"
        rows="4"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value) || setSubmitMessage('')}
      ></Textarea>
      {submitMessage && (
        <p className="mt-2 font-semibold text-xs text-red-500">
          {submitMessage}
        </p>
      )}
      <div className="flex items-center mt-4">
        <Button
          className="rounded py-2 mr-4 w-32"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              {' '}
              <Loader2 className="animate-spin mr-2" /> <span>Please wait</span>
            </>
          ) : (
            <div className="flex">Submit</div>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setRating(0)
            setReviewText('')
            setSubmitMessage('')
            const escKeyEvent = new KeyboardEvent('keydown', {
              key: 'Escape',
              keyCode: 27,
            })
            document.dispatchEvent(escKeyEvent)
          }}
          className="flex py-2 w-32 bg-red-600 hover:bg-red-700 hover:text-white text-white rounded close-review-popup"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export function RateAndReview({ userId }) {
  console.log('userId', userId)
  return (
    <Popover className="popup-item">
      <PopoverTrigger asChild>
        <div className="cursor-pointer flex items-center">
          <Star size={16} className="mr-2" />
          Rate User
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 popup-item">
        <RateAndReviewCard userId={userId} />
      </PopoverContent>
    </Popover>
  )
}
