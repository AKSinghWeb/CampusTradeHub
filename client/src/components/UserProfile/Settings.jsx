// Settings.js
const Settings = () => {
  return (
    <div className="bg-white p-8 mb-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Change Password</p>
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Privacy Preferences</p>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Display my profile to others
        </label>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
        Save Changes
      </button>
    </div>
  )
}

export default Settings
