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
import { Button } from '@/components/ui/button'
import useApiCall from '@/hooks/useApiCall'
import { productApiService } from '@/services/apiService'
import { Loader2, PackageCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AlertDialogSold({ productId }) {
  const navigate = useNavigate()

  const [updateProductAvailabilityApiCall, loading] = useApiCall(
    productApiService.updateProductAvailability
  )

  const handleMarkAsSold = async () => {
    try {
      await updateProductAvailabilityApiCall(
        'Mark as sold successfully!',
        productId,
        { status: 'sold' }
      )

      navigate('/user/my-postings')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex  border-0 py-2 focus:outline-none rounded">
          <PackageCheck size={20} className="mr-2" />
          Mark as Sold
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This product will be marked as sold and will be removed from the
            platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleMarkAsSold()}
            disabled={loading}
          >
            {loading ? (
              <>
                {' '}
                <Loader2 className="animate-spin mr-2" />{' '}
                <span>Please wait</span>
              </>
            ) : (
              <>Continue</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
