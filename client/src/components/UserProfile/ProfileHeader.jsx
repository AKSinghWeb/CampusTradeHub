import { useAuth } from '@/context/UserAuthContext'
import { Button } from '../ui/button'
import useAuthorization from '@/hooks/useAuthorization'
import FileResizer from 'react-image-file-resizer'
import { useEffect, useState } from 'react'
import { userApiService } from '@/services/apiService'
import useApiCall from '@/hooks/useApiCall'
import { Loader2, Save } from 'lucide-react'

const ProfileHeader = () => {
  useAuthorization()
  const { state, dispatch } = useAuth()
  const [selectedPicture, setSelectedPicture] = useState(
    state.user && state.user.profilePicture
      ? state.user.profilePicture
      : 'https://placehold.co/300'
  )

  useEffect(() => {
    // Update selectedPicture when state.user.profilePicture changes
    setSelectedPicture(state.user ? state.user.profilePicture : null)
  }, [state.user])

  const [updateProfilePictureApiCall, loading] = useApiCall(
    userApiService.updateProfilePicture
  )

  const handleImageChange = async (e) => {
    const file = e.target.files[0]

    FileResizer.imageFileResizer(
      file,
      300, // maxWidth
      300, // maxHeight
      'JPEG', // compressFormat
      100, // quality
      0, // rotation
      (blob) => {
        setSelectedPicture(blob)
      },
      'blob'
    )
  }

  const handleImageSubmit = async () => {
    const formData = new FormData()
    formData.append('profilePicture', selectedPicture)

    try {
      const response = await updateProfilePictureApiCall(
        'Profile Picture Updated successfully!',
        formData
      )
      setSelectedPicture(response.profilePicture)
      dispatch({ type: 'UPDATE', payload: { ...response } })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" dark:bg-slate-900 p-8 border mb-4 rounded-lg">
      <div className="flex flex-col ">
        <div>
          <h2 className="text-2xl text-center mb-4 font-bold text-gray-500">
            Profile Picture
          </h2>
        </div>
        <div className="flex mx-auto my-8 items-center">
          {state.isLoggedIn && (
            <img
              src={
                selectedPicture instanceof Blob
                  ? URL.createObjectURL(selectedPicture)
                  : selectedPicture
              }
              alt="Profile"
              className="w-44 h-44 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex w-full items-center gap-8 justify-center">
          <label htmlFor="image" className="flex  cursor-pointer">
            <div className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              <span className="font-semibold">Update Picture</span>
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              key={selectedPicture ? 'hasImage' : 'noImage'}
              className="sr-only"
            />
          </label>

          <Button
            className="flex bg-blue-600 hover:bg-blue-700 hover:text-white text-white rounded"
            disabled={!(selectedPicture instanceof Blob) || loading}
            onClick={handleImageSubmit}
          >
            {loading ? (
              <>
                {' '}
                <Loader2 className="animate-spin mr-2" />{' '}
                <span>Please wait</span>
              </>
            ) : (
              <div className="flex">
                <Save size={20} className="mr-2" />
                Save Picture
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
