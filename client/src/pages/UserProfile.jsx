// import { StarFilledIcon } from '@radix-ui/react-icons'
import { RateAndReview } from '@/components/ProductPage/RateAndReviewPop'
import { ReportUser } from '@/components/ProductPage/ReportUser'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { reviewsApiService, userApiService } from '@/services/apiService'
import { Loader2, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StarRating = ({ rating }) => {
  rating = Math.round(rating)
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star key={index} fill={index < rating ? '#FFD700' : '#CCCCCC'} color="" />
  ))

  return <div className="flex items-center">{stars}</div>
}

const UserCard = ({ user }) => {
  return (
    <div className="w-full py-8 ">
      <div className="flex w-full max-md:flex-col flex-row justify-between pt-4">
        <img
          className="w-40 h-40 md:w-64 md:h-64 mb-3 max-md:mx-auto rounded-md shadow-lg"
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
        />
        <div className="max-md:mt-4">
          <div className="flex  flex-col mb-4">
            <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
              {user.name}
            </h5>
            <div className="text-lg text-gray-500 dark:text-gray-400">
              @{user.username}
            </div>
          </div>
          <div className="flex flex-col mt-4 lg:mt-8 mb-4">
            <div className="text-lg font-semibold text-muted-foreground">
              Ratings
            </div>
            <div className="flex items-center">
              {!user.reviewCount ? ( // If no reviews, show message
                <span className="text-xl font-medium text-gray-900 dark:text-white mt-1 mr-2">
                  No reviews yet
                </span>
              ) : (
                <>
                  <span className="text-xl font-medium text-gray-900 dark:text-white mt-1 mr-2">
                    {user.averageRating}/5
                  </span>
                  <StarRating rating={user.averageRating} />
                </>
              )}
            </div>
          </div>
          <div className="md:flex hidden  mt-8">
            <Button className="flex mr-4 border-0 py-2 focus:outline-none rounded">
              <RateAndReview userId={user.id} />
            </Button>
            <Button
              variant="outline"
              className="flex py-2 bg-red-600 hover:bg-red-700 hover:text-white text-white rounded"
            >
              <ReportUser userId={user.id} />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 md:hidden mt-4">
        <Button className="flex  border-0 py-2 focus:outline-none rounded">
          <RateAndReview userId={user.id} />
        </Button>
        <Button
          variant="outline"
          className="flex py-2 bg-red-600 hover:bg-red-700 hover:text-white text-white rounded"
        >
          <ReportUser userId={user.id} />
        </Button>
      </div>
    </div>
  )
}

const ReviewCard = ({ review }) => {
  return (
    <div className="flex w-full flex-col gap-4">
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
  )
}

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])

  const [loading, setLoading] = useState(true)
  const { userId } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApiService.getProfile(userId)
        const data = response
        setUser(data)
        setLoading(false)
      } catch (err) {
        console.log('err', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewsApiService.getReviews(userId)
        const data = response
        setReviews(data)
        console.log('data', data)
      } catch (err) {
        console.log('err', err)
      }
    }
    fetchReviews()
  }, [userId])

  return (
    <div className="flex flex-col my-16 mx-8 px-8 lg:px-16  max-w-3xl lg:mx-auto min-h-screen  bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-900 dark:border-slate-950">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="animate-spin h-24 w-24 text-blue-500" />
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Loading User Informaiton...
          </p>
        </div>
      ) : !user ? (
        // Show message when no products are available
        <div className="text-center">
          <p className="text-xl mt-8 md:mt-12 lg:mt-16 font-semibold text-gray-800 dark:text-gray-200">
            user Information not available.
          </p>
        </div>
      ) : (
        <>
          <div className="w-full">
            <UserCard user={user} />
          </div>
          <div className="w-full flex flex-col items-start">
            <div className="mb-4">
              <span className="font-bold">Joined CampusTradeHub on: </span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="mb-2 font-bold">Bio</div>
            <div className="mb-4">{user.bio ? user.bio : 'Not available'}</div>
          </div>
          <Separator />
          <div className="w-full flex flex-col items-start">
            <h2 className="mt-8 mb-4 text-xl font-bold">
              Ratings & Reviews Received:
            </h2>
            {!user.reviewCount ? (
              <span className="text-xl font-medium text-gray-900 dark:text-white mt-1 mr-2">
                No reviews yet
              </span>
            ) : (
              reviews &&
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default UserProfile
