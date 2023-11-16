// NotFound.js
import { Link } from 'react-router-dom'

import NotFoundImage from '@/assets/not_found.svg' // Replace with the actual path to your SVG file
import { Button } from '../ui/button'

const NotFound = () => {
  return (
    <div className="flex flex-col pb-24 items-center justify-center h-screen">
      <img
        src={NotFoundImage}
        alt="Not Found"
        className="w-96 h-96 object-contain"
      />
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg text-mute mb-8">
        {"Oops! The page you're looking for doesn't exist."}
      </p>
      <Link to="/">
        <Button>Go back to Home</Button>
      </Link>
    </div>
  )
}

export default NotFound
