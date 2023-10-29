// ReviewsAndRatings.js

const ReviewsAndRatings = () => {
  // Replace this with actual review data
  const reviews = [
    {
      id: 1,
      username: 'Jane Doe',
      rating: 4.5,
      reviewText: 'Great seller, smooth transaction!',
    },
    {
      id: 2,
      username: 'Bob Smith',
      rating: 5,
      reviewText: 'Excellent communication and fast shipping.',
    },
  ]

  return (
    <div className="bg-white p-8 mb-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Reviews and Ratings</h2>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4">
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold mr-2">{review.username}</p>
            <div className="flex items-center">
              {/* Display stars based on the rating */}
              {[...Array(Math.round(review.rating))].map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 text-yellow-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c-.3 0-.6.1-.8.4l-7.2 9-2-1.5c-.3-.2-.7-.2-1 0-.2.1-.3.3-.4.5 0 .1-1.1 1.7-1.6 2.5-.2.3-.2.7 0 1 .1.2.3.3.5.4 0 0 3.3 1.3 4.8 1.8.2.1.5.2.8.2s.6-.1.8-.2c1.5-.5 4.8-1.8 4.8-1.8.2-.1.3-.3.4-.5.1-.3.1-.6 0-.9 0 0-2.2-5.4-2.5-6.4 0-.2-.1-.4-.3-.6-.1-.1-.3-.3-.5-.4l-2.7-2.1c-.1-.1-.3-.2-.5-.2zm-.2 4.3c.1-.2.1-.4.1-.6s0-.4-.1-.6l.3-.2 2.3-3c.1-.2.1-.4 0-.6l-2.2-3-.3-.2c-.1-.1-.3-.2-.5-.2s-.4.1-.6.2l-2.7 2.1c-.2.1-.3.3-.3.5 0 .2 2.5 6 2.5 6 .1.2.2.3.4.3.1 0 .3-.1.4-.2.1-.1 2.6-3.7 2.7-3.8z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-500 mb-2">{review.reviewText}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewsAndRatings
