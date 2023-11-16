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
import { adminApiService } from '@/services/apiService'
import { Loader2, Trash2 } from 'lucide-react'

export function AdminUserDelete({ userId, handleDelete }) {
  const [deleteUserApiCall, loading] = useApiCall(adminApiService.deleteUser)

  const handleMarkAsDelete = async () => {
    try {
      await deleteUserApiCall('User Deleted successfully!', userId)
      handleDelete(userId)
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
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This user will be deleted and all the products will be removed from
            the platform.
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
