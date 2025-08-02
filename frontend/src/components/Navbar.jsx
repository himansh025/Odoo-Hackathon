import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import axiosInstance from '../Config/apiconfig'
import { logout } from '../Store/authSlicer'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/users/logout')
      localStorage.removeItem('token')
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/tickets?search=${searchTerm}`)
    }
  }

  return (
    <nav className="bg-blue-950 shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* App Name */}
        <Link to="/" className="flex items-center text-white text-2xl font-bold tracking-tight">
          QuickDesk
        </Link>

        {/* Search Bar (only on large screens) */}
        <div className="hidden lg:flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg border  text-white border-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Search tickets..."
          />
          <button
            onClick={handleSearch}
            className="bg-white text-black   p-2 rounded-full hover:bg-gray-100"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-blue-200 flex items-center"
            >
              <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-200 flex items-center">
                {/* <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" /> */}
                <span className="hidden sm:inline">Login</span>
              </Link>
               <Link to="/singup" className="text-white hover:text-blue-200 flex items-center">
                {/* <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" /> */}
                <span className="hidden sm:inline">Singup</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
