// Sidebar.js

import { Home, Users, ShoppingBag, Settings } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="bg-purple-700 text-white w-64 h-full  overflow-y-auto transition-all duration-300">
      {/* Sidebar Header */}
      <div className="p-4">
        <span className="text-lg font-semibold">CampusTradeHub</span>
      </div>

      {/* Sidebar Navigation */}
      <nav className="text-sm">
        {/* Home Link */}
        <a
          href="#"
          className="flex items-center p-4 hover:bg-purple-600 transition duration-300"
        >
          <Home size={18} className="mr-2" />
          Home
        </a>

        {/* Users Link */}
        <a
          href="#"
          className="flex items-center p-4 hover:bg-purple-600 transition duration-300"
        >
          <Users size={18} className="mr-2" />
          Users
        </a>

        {/* Products Link */}
        <a
          href="#"
          className="flex items-center p-4 hover:bg-purple-600 transition duration-300"
        >
          <ShoppingBag size={18} className="mr-2" />
          Products
        </a>

        {/* Settings Link */}
        <a
          href="#"
          className="flex items-center p-4 hover:bg-purple-600 transition duration-300"
        >
          <Settings size={18} className="mr-2" />
          Settings
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar
