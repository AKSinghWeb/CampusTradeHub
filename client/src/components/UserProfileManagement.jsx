// UserProfileManagement.js
import { useState } from 'react'

const UserProfileManagement = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    interests: 'Travel, Photography',
    newPassword: '',
    confirmPassword: '',
    deleteConfirmation: '',
  })

  // State for success message
  const [successMessage, setSuccessMessage] = useState('')

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Add logic to handle form submission (e.g., API requests, data updates)
    // For this example, let's just show a success message
    setSuccessMessage('Profile updated successfully!')
  }

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <div className="max-w-xl mx-auto mt-32 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>

      {/* Edit Profile Section */}
      <form onSubmit={handleSubmit} className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Interests
          </label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>

      {/* Change Password Section */}
      <form onSubmit={handleSubmit} className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Change Password
        </button>
      </form>

      {/* Delete Account Section */}
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-2">Delete Account</h3>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Confirm Account Deletion (type DELETE)
          </label>
          <input
            type="text"
            name="deleteConfirmation"
            value={formData.deleteConfirmation}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete Account
        </button>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="text-green-600 mt-4">{successMessage}</div>
      )}
    </div>
  )
}

export default UserProfileManagement
