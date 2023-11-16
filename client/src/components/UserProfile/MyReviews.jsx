// import { StarFilledIcon } from '@radix-ui/react-icons'

import { useAuth } from '@/context/UserAuthContext'
import { reviewsApiService } from '@/services/apiService'
import { Loader2, Star, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import useApiCall from '@/hooks/useApiCall'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function AlertDialogDemo({ handleDelete, loading, review }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className="flex  items-center bg-red-600 hover:bg-red-700  rounded"
        >
          {loading ? (
            <>
              {' '}
              <Loader2 className="animate-spin mr-2" /> <span>Please wait</span>
            </>
          ) : (
            <div className="flex">
              <Trash2 size={14} className="mr-1 mb-1" />
              Delete
            </div>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete the review from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(review)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const StarRating = ({ rating }) => {
  rating = Math.round(rating)
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star key={index} fill={index < rating ? '#FFD700' : '#CCCCCC'} color="" />
  ))

  return <div className="flex items-center">{stars}</div>
}

const ReviewCard = ({ review, loading, handleDelete }) => {
  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex items-center mb-2 space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src={review.reviewerId.profilePicture}
              alt="user profile picture"
            />
            <div className="space-y-1 font-medium dark:text-white">
              <p>
                {review.reviewerId.name}{' '}
                <time className="block text-sm text-gray-500 dark:text-gray-400">
                  Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                </time>
              </p>
            </div>
          </div>
          <AlertDialogDemo
            handleDelete={handleDelete}
            loading={loading}
            review={review}
          />
        </div>
        <div className="flex items-center mb-1">
          <StarRating rating={review.rating} />
          <span className="text-lg font-medium text-gray-900 dark:text-white mt-1 ml-2">
            {review.rating}/5
          </span>
        </div>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          {review.description}
        </p>
        <Separator className="mb-4" />
      </div>
    </>
  )
}

const MyReviews = () => {
  const [reviews, setReviews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [reviewsPerPage] = useState(5)

  const [deleteReviewApiCall, loading2] = useApiCall(
    reviewsApiService.deleteReview
  )

  const handleDelete = async (review) => {
    try {
      const response = await deleteReviewApiCall(
        'Review deleted successfully!',
        review._id
      )
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== response.reviewId)
      )
    } catch (error) {
      console.log(error)
    }
  }

  const [loading, setLoading] = useState(true)

  const { state } = useAuth()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewsApiService.getReviews(
          state && state.user.id
        )
        const data = response
        setReviews(data)
        console.log('data', data)
      } catch (err) {
        console.log('err', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [state])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview)

  return (
    <div className="flex items-center justify-center max-md:px-8">
      <div className="w-full lg:max-w-2xl max-md:px-8  dark:bg-slate-900 p-8 flex flex-col gap-4 border rounded-lg">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Ratings & Reviews Received
        </h1>
        <Separator />
        {loading ? (
          <div className="flex flex-col mt-64 items-center justify-center h-full">
            <Loader2 className="animate-spin h-24 w-24 text-blue-500" />
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Loading Reviews
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col items-start">
              {reviews.length === 0 ? (
                <span className="text-xl font-medium text-gray-900 dark:text-white mt-1 mr-2">
                  No reviews yet
                </span>
              ) : (
                reviews &&
                currentReviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    handleDelete={handleDelete}
                    loading={loading2}
                  />
                ))
              )}
            </div>

            <div className="mt-8 md:mt-12 lg:mt-16">
              <Pagination
                productsPerPage={reviewsPerPage}
                totalProducts={reviews.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MyReviews
