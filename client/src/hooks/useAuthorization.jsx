import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCustomToasts from './useCustomToasts'
import { getAuthToken } from '@/utils/authFunctions'

const useAuthorization = () => {
  const navigate = useNavigate()
  const { showErrorToast } = useCustomToasts()

  useEffect(() => {
    if (!getAuthToken()) {
      showErrorToast(
        'Access Denied',
        'You must be logged in to access this feature.'
      )
      navigate('/')
    }
  }, [navigate, showErrorToast])

  return
}

export default useAuthorization
