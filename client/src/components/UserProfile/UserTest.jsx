import { useAuth } from '@/context/UserAuthContext'
import { useState } from 'react'

const EditProfileForm = () => {
  const { state, dispatch } = useAuth()
  const [formData, setFormData] = useState({
    name: state.user ? state.user.name : '',
    email: state.user ? state.user.email : '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Dispatch an action to update user information
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        name: formData.name,
        email: formData.email,
      },
    })
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}

export default EditProfileForm
