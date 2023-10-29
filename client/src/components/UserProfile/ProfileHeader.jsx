const ProfileHeader = () => {
  return (
    <div className="bg-blue-500 text-white mt-32 p-8 mb-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://placekitten.com/100/100" // Replace with the actual profile picture URL
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-sm">Verified User</p>
          </div>
        </div>
        <button className="bg-white text-blue-500 px-4 py-2 rounded-full">
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default ProfileHeader
