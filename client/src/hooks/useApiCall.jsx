// useApiCall.js
import { useState } from 'react'
import useCustomToasts from './useCustomToasts'

const useApiCall = (apiFunction) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { showErrorToast, showSuccessToast } = useCustomToasts()

  const makeApiCall = async (successMessage, ...args) => {
    try {
      setLoading(true)
      const result = await apiFunction(...args)
      showSuccessToast('Success', successMessage)
      return result
    } catch (err) {
      setError(err.message)
      showErrorToast('Error', err.message)
    } finally {
      setLoading(false)
    }
  }

  return [makeApiCall, loading, error]
}

export default useApiCall
