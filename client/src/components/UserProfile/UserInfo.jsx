const UserInfo = () => {
  return (
    <div className="bg-white p-8 mb-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-semibold">John Doe</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-semibold">New York, USA</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Member Since</p>
        <p className="font-semibold">January 2022</p>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Bio</p>
        <p className="font-semibold">
          Passionate about trading and connecting with others!
        </p>
      </div>
    </div>
  )
}

export default UserInfo
