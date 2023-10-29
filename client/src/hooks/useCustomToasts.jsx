// useCustomToasts.js

import { useToast } from '@/components/ui/use-toast'
import { AlertOctagon, CheckCircle, Info, AlertTriangle } from 'lucide-react'

const useCustomToasts = () => {
  const { toast } = useToast()

  const showErrorToast = (title, message) => {
    toast({
      variant: 'destructive',
      description: (
        <div className="flex items-center">
          <AlertOctagon className="w-6 h-6 mr-2 text-white" />
          <div>
            <p className="font-semibold">{title}</p>
            <p>{message}</p>
          </div>
        </div>
      ),
    })
  }

  const showSuccessToast = (title, message) => {
    toast({
      variant: 'success',
      description: (
        <div className="flex items-center">
          <CheckCircle className="w-6 h-6 mr-2 text-white" />
          <div>
            <p className="font-bold">{title}</p>
            <p>{message}</p>
          </div>
        </div>
      ),
    })
  }

  const showWarningToast = (title, message) => {
    toast({
      variant: 'warning',
      description: (
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-white" />
          <div>
            <p className="font-semibold">{title}</p>
            <p>{message}</p>
          </div>
        </div>
      ),
    })
  }

  const showInfoToast = (title, message) => {
    toast({
      variant: 'info',
      description: (
        <div className="flex items-center">
          <Info className="w-6 h-6 mr-2 text-white" />
          <div>
            <p className="font-semibold">{title}</p>
            <p>{message}</p>
          </div>
        </div>
      ),
    })
  }

  return { showErrorToast, showSuccessToast, showWarningToast, showInfoToast }
}

export default useCustomToasts
