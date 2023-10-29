const ContactInformation = () => {
  // Replace this with actual user data
  const user = {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    phone: '+1 123-456-7890',
  }

  return (
    <div className="bg-white p-8 mb-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Username</p>
        <p className="font-semibold">{user.username}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-semibold">{user.email}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Phone</p>
        <p className="font-semibold">{user.phone}</p>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">
        Send Message
      </button>
    </div>
  )
}

export default ContactInformation
