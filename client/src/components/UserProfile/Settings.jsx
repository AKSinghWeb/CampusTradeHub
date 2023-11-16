/* eslint-disable no-unused-vars */
// ProductForm.js
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/UserAuthContext'

import { Loader2, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PasswordInput } from '../ui/PasswordInput'
import { userApiService } from '@/services/apiService'
import useApiCall from '@/hooks/useApiCall'

const UserSettings = () => {
  const { state } = useAuth()

  const [updateUsernameApiCall, loading] = useApiCall(
    userApiService.updateUsername
  )
  const [updatePasswordApiCall, loading2] = useApiCall(
    userApiService.updatePassword
  )

  const [newUsername, setNewUsername] = useState(`${state.user.username}`)
  const [newUsernameError, setNewUsernameError] = useState({
    username: '',
  })

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [passwordError, setPasswordError] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPassword((prev) => ({ ...prev, [name]: value }))
    setPasswordError((prev) => ({ ...prev, [name]: '' }))
  }

  const validatePassword = () => {
    let errors = {}

    if (!password.oldPassword) {
      errors.oldPassword = 'Old Password is required'
    } else if (password.oldPassword.length < 8) {
      errors.oldPassword = 'Old Password must be at least 8 characters'
    }

    if (!password.newPassword) {
      errors.newPassword = 'Password is required'
    } else if (password.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters'
    }

    if (!password.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required'
    } else if (password.confirmPassword !== password.newPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    return errors
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    const errors = validatePassword()

    if (Object.keys(errors).length > 0) {
      setPasswordError(errors)
      return
    }

    try {
      const response = await updatePasswordApiCall(
        'Password Updated successfully!',
        {
          password: password.oldPassword,
          newPassword: password.newPassword,
        }
      )
      console.log(response)
      setPassword({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleUsernameChange = (e) => {
    const { name, value } = e.target
    setNewUsername(value)
    setNewUsernameError((prev) => ({ ...prev, [name]: '' }))
  }

  const validateUsername = () => {
    let errors = {}

    if (!newUsername) {
      errors.username = 'Username is required'
    } else if (newUsername.length < 3) {
      errors.username = 'Username must be at least 3 characters'
    }

    return errors
  }

  const handleUserNameSubmit = async (e) => {
    e.preventDefault()

    const errors = validateUsername()

    if (Object.keys(errors).length > 0) {
      setNewUsernameError(errors)
      return
    }

    try {
      const response = await updateUsernameApiCall(
        'Username Updated successfully!',
        {
          username: newUsername,
        }
      )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full lg:max-w-2xl max-md:px-8 flex flex-col gap-4">
        <form
          onSubmit={handleUserNameSubmit}
          className="w-full dark:bg-slate-900 p-8 flex flex-col gap-4 border rounded-lg"
        >
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl max-md:text-center font-bold mb-2 text-gray-500">
              Change Username
            </h2>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="username">New Username</Label>
                <div className="">
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    placeholder="Enter New Username"
                    className="p-2 pr-6"
                  />
                </div>
                {newUsernameError.username && (
                  <p className="text-red-500 ml-2 font-semibold text-sm">
                    {newUsernameError.username}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex mt-2">
            <Button type="submit" disabled={loading} className="flex py-2 ">
              {loading ? (
                <>
                  {' '}
                  <Loader2 className="animate-spin mr-2" />{' '}
                  <span>Please wait</span>
                </>
              ) : (
                <div className="flex">Save New Username</div>
              )}
            </Button>
          </div>
        </form>
        <form
          onSubmit={handlePasswordSubmit}
          className="w-full dark:bg-slate-900 p-8 flex flex-col gap-4 border rounded-lg"
        >
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl max-md:text-center font-bold mb-2 text-gray-500">
              Change Password
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <Label htmlFor="oldPassword">Old Password</Label>
                <div className="">
                  <PasswordInput
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={password.oldPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter Old Password"
                    className="p-2 pr-6"
                  />
                </div>
                {passwordError.oldPassword && (
                  <p className="text-red-500 ml-2 font-semibold text-sm">
                    {passwordError.oldPassword}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="">
                  <PasswordInput
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter New Password"
                    className="p-2 pr-6 w-full"
                  />
                </div>
                {passwordError.newPassword && (
                  <p className="text-red-500 ml-2 font-semibold text-sm">
                    {passwordError.newPassword}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="">
                  <PasswordInput
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm New Password"
                    className="p-2 pr-6"
                  />
                </div>
                {passwordError.confirmPassword && (
                  <p className="text-red-500 ml-2 font-semibold text-sm">
                    {passwordError.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex mt-2">
            <Button type="submit" disabled={loading} className="flex py-2 ">
              {loading2 ? (
                <>
                  {' '}
                  <Loader2 className="animate-spin mr-2" />{' '}
                  <span>Please wait</span>
                </>
              ) : (
                <div className="flex">Save New Password</div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserSettings
