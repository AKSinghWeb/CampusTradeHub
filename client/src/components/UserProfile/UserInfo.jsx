/* eslint-disable no-unused-vars */
// ProductForm.js
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/UserAuthContext'
import useApiCall from '@/hooks/useApiCall'
import { userApiService } from '@/services/apiService'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'

const UserInfo = () => {
  let { state, dispatch } = useAuth()

  const [userInfo, setUserInfo] = useState({
    name: (state.user && state.user.name) || '',
    email: (state.user && state.user.email) || '',
    bio: (state.user && state.user.bio) || '',
    contactInfo: (state.user && state.user.contactInfo) || '',
    location: (state.user && state.user.location) || '',
  })
  const [userInfoErrors, setUserInfoErrors] = useState({
    name: '',
    email: '',
    bio: '',
    contactInfo: '',
    location: '',
  })

  const [updateUserInfoApiCall, loading] = useApiCall(
    userApiService.updateProfile
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prevProduct) => ({ ...prevProduct, [name]: value }))
    setUserInfoErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    let errors = {}

    if (!userInfo.name) {
      errors.name = 'Name is required'
    } else if (userInfo.name.length < 2) {
      errors.name = 'Name should be greater than 2 characters'
    }

    if (!userInfo.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = 'Email is invalid'
    }

    if (userInfo.bio && userInfo.bio.length > 200) {
      errors.bio = 'Bio should be less than 200 characters'
    }

    if (userInfo.contactInfo && userInfo.contactInfo.length !== 10) {
      errors.contactInfo = 'Contact Info should be 10 digits'
    }

    if (userInfo.location && userInfo.location.length < 3) {
      errors.location = 'Location should be greater than 3 characters'
    }

    setUserInfoErrors(errors)

    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const response = await updateUserInfoApiCall(
        'User Info Updated successfully!',
        userInfo
      )
      dispatch({ type: 'UPDATE', payload: response })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full dark:bg-slate-900 p-8 flex flex-col gap-4 border rounded-lg"
      >
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl max-md:text-center font-bold mb-2 text-gray-500">
            User Details
          </h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="title">Full Name</Label>
              <div className="relative flex items-center">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className="p-2 pr-6"
                />
              </div>
              {userInfoErrors.name && (
                <p className="text-red-500 ml-2 font-semibold text-sm">
                  {userInfoErrors.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex-1">
            <Label htmlFor="email">Email</Label>
            <div className="relative flex items-center">
              <Input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                className="p-2 pr-6"
              />
              {/* <span className="absolute right-1">
                <Package size={18} className="text-gray-400" />
              </span> */}
            </div>
            {userInfoErrors.email && (
              <p className="text-red-500 ml-2 font-semibold text-sm">
                {userInfoErrors.email}
              </p>
            )}
          </div>

          <div className="flex-1">
            <Label htmlFor="bio">Bio</Label>
            <div className="relative flex items-center">
              <Textarea
                id="bio"
                name="bio"
                value={userInfo.bio}
                onChange={handleInputChange}
                placeholder="Enter Bio"
                className="p-2 pr-6"
              />
              {/* <span className="absolute right-1">
                <FileText size={18} className="text-gray-400" />
              </span> */}
            </div>
            {userInfoErrors.bio && (
              <p className="text-red-500 ml-2 font-semibold text-sm">
                {userInfoErrors.bio}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="contactInfo">Contact Info</Label>
            <div className="relative flex items-center">
              <Input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={userInfo.contactInfo}
                onChange={handleInputChange}
                placeholder="Enter Contact Info"
                className="p-2 pr-6"
              />
              {/* <span className="absolute right-1">
                <Package size={18} className="text-gray-400" />
              </span> */}
            </div>
            {userInfoErrors.contactInfo && (
              <p className="text-red-500 ml-2 font-semibold text-sm">
                {userInfoErrors.contactInfo}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="location">Location</Label>
            <div className="relative flex items-center">
              <Input
                type="text"
                id="location"
                name="location"
                value={userInfo.location}
                onChange={handleInputChange}
                placeholder="Enter Location"
                className="p-2 pr-6"
              />
              {/* <span className="absolute right-1">
                <Package size={18} className="text-gray-400" />
              </span> */}
            </div>
            {userInfoErrors.location && (
              <p className="text-red-500 ml-2 font-semibold text-sm">
                {userInfoErrors.location}
              </p>
            )}
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
              <div className="flex">Save Changes</div>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UserInfo
