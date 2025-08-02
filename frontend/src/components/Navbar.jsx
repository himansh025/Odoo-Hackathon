import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HomeIcon, TicketIcon, PlusCircleIcon, UserIcon, ShieldCheckIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function Navbar() {
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('token')
  const [searchTerm, setSearchTerm] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleSearch = () => {
    navigate(`/tickets?search=${searchTerm}`)
  }

  const handleAsk = () => {
    navigate('/ask-question')
  }

  return (
    <nav className="bg-blue-700 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-white text-2xl font-bold tracking-tight">
          <TicketIcon className="h-6 w-6 mr-2" />
          QuickDesk
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center text-white hover:text-blue-200 transition-colors">
            <HomeIcon className="h-5 w-5 mr-1" />
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/tickets" className="flex items-center text-white hover:text-blue-200 transition-colors">
                <TicketIcon className="h-5 w-5 mr-1" />
                Tickets
              </Link>
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 flex items-center"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={handleAsk}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-1" />
                Ask
              </button>
              <Link to="/profile" className="flex items-center text-white hover:text-blue-200 transition-colors">
                <UserIcon className="h-5 w-5 mr-1" />
                Profile
              </Link>
              <Link to="/admin" className="flex items-center text-white hover:text-blue-200 transition-colors">
                <ShieldCheckIcon className="h-5 w-5 mr-1" />
                Admin
              </Link>
              <button onClick={handleLogout} className="flex items-center text-white hover:text-blue-200 transition-colors">
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center text-white hover:text-blue-200 transition-colors">
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
                Login
              </Link>
              <Link to="/signup" className="flex items-center text-white hover:text-blue-200 transition-colors">
                <UserIcon className="h-5 w-5 mr-1" />
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar