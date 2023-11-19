import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useRef, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { PasswordInput } from '../ui/PasswordInput'
import useApiCall from '@/hooks/useApiCall'
import { authApiService } from '@/services/apiService'
import { Loader2 } from 'lucide-react'
import { login } from '@/utils/authFunctions'
import { useAuth } from '@/context/UserAuthContext'
import { Link } from 'react-router-dom'

const SignupForm = () => {
  const inputRef = useRef(null)
  const [makeSignupApiCall, loading] = useApiCall(authApiService.signup)
  const [termsChecked, setTermsChecked] = useState(false)
  const { dispatch } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })
  const [formErrors, setFormErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    terms: '',
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleTermsChange = () => {
    setTermsChecked((prev) => !prev)
    setFormErrors((prev) => ({ ...prev, terms: '' }))
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    setFormErrors((prev) => ({ ...prev, [id]: '' }))
  }

  const validateForm = () => {
    let errors = {}
    if (!formData.name) {
      errors.name = 'Name is required'
    }
    if (!formData.username) {
      errors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long'
    }
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long'
    }
    if (!termsChecked) {
      errors.terms = 'You must accept the terms and conditions'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form data
    if (!validateForm()) {
      return
    }
    try {
      const response = await makeSignupApiCall('Signup successful', formData)
      login(dispatch, response.user, response.token)
      const escKeyEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        keyCode: 27,
      })
      document.dispatchEvent(escKeyEvent)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2 py-6">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              ref={inputRef}
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && (
              <p className="text-red-500 font-semibold text-sm">
                {formErrors.name}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {formErrors.username && (
              <p className="text-red-500 font-semibold text-sm">
                {formErrors.username}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <p className="text-red-500 font-semibold text-sm">
                {formErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {formErrors.password && (
              <p className="text-red-500 font-semibold text-sm">
                {formErrors.password}
              </p>
            )}
          </div>
          <div className="space-y-1 mt-2">
            <div className="items-top flex space-x-2 mt-6">
              <Checkbox
                id="terms1"
                checked={termsChecked}
                onCheckedChange={handleTermsChange}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept{' '}
                  <Link
                    onClick={() => {
                      const escKeyEvent = new KeyboardEvent('keydown', {
                        key: 'Escape',
                        keyCode: 27,
                      })
                      document.dispatchEvent(escKeyEvent)
                    }}
                    to={'/terms'}
                  >
                    <span className="text-primary">Terms and Conditions</span>
                  </Link>
                </label>
              </div>
            </div>
            {formErrors.terms && (
              <p className="text-red-500 font-semibold text-sm">
                {formErrors.terms}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={loading && termsChecked}
            className="w-full"
          >
            {loading ? (
              <>
                {' '}
                <Loader2 className="animate-spin mr-2" />{' '}
                <span> Please wait </span>
              </>
            ) : (
              'Signup'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default SignupForm
