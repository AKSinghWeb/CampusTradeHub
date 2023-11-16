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
import { Loader2, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AlertDialogDelete({ productId }) {
  const navigate = useNavigate()

  const [deleteProductApiCall, loading] = useApiCall(
    productApiService.deleteProduct
  )

  const handleMarkAsDelete = async () => {
    try {
      await deleteProductApiCall('Product Deleted successfully!', productId)

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="flex py-2 bg-red-600 hover:bg-red-700 hover:text-white text-white rounded"
        >
          <Trash2 size={20} className="mr-2" />
          Delete Product
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This product will be deleted and will be removed from the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleMarkAsDelete()}
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
