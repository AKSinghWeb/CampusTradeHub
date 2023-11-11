export const UserProfileCard = ({ user }) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-6 w-64">
      <img
        className="w-16 h-16 rounded-full mx-auto mb-4"
        src={user.avatar}
        alt={`${user.name}'s avatar`}
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>

      <div className="mt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Location:</span> {user.location}
        </p>
        {/* Add more user information as needed */}
      </div>
    </div>
  )
}
