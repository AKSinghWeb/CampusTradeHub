import { CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const UploadSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="shadow-md border flex flex-col rounded-md p-8 max-w-sm w-full mx-auto">
        <CheckCircle size={64} className="text-green-500 mx-auto" />
        <h2 className="text-2xl font-semibold  text-center mt-4 mb-6">
          Product Uploaded Successfully!
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          Your product has been successfully uploaded. It will be visible on the
          platform after verification by an admin.
        </p>
        <Link className="flex justify-center" to="/">
          <Button>Go to Home Page</Button>
        </Link>
      </div>
    </div>
  )
}

export default UploadSuccess
