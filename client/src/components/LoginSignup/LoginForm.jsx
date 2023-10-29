import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useRef, useState } from 'react'
import useApiCall from '@/hooks/useApiCall'
import { authApiService } from '@/services/apiService'
import { Loader2 } from 'lucide-react'
import { PasswordInput } from '../ui/PasswordInput'
import { login } from '@/utils/authFunctions'
import { useAuth } from '@/context/UserAuthContext'

const LoginForm = () => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const [makeLoginApiCall, loading] = useApiCall(authApiService.login)
  const { dispatch } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  })

  const validateForm = () => {
    let errors = {}

    if (!formData.username) {
      errors.username = 'Username is required'
    }

    if (!formData.password) {
      errors.password = 'Password is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const response = await makeLoginApiCall(
        'Login successful',
        formData.username,
        formData.password
      )
      console.log(response)
      login(dispatch, response.user, response.token)
      const escKeyEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
      })
      document.dispatchEvent(escKeyEvent)
      // console.log(state)
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Login failed', error)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
    setFormErrors((prev) => ({ ...prev, [id]: '' }))
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2 py-6">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={handleChange}
              ref={inputRef}
            />
            {formErrors.username && (
              <p className="text-red-500 font-semibold text-sm">
                {formErrors.username}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <p className="text-red-500 font-semibold text-sm">
                {formErrors.password}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                {' '}
                <Loader2 className="animate-spin mr-2" />{' '}
                <span>Logging in</span>
              </>
            ) : (
              'Login'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default LoginForm
