import { Link } from 'react-router-dom'
import { BellIcon, UserCircleIcon, TicketIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'

function DashboardHeader() {
  const {user }= useSelector((state)=>state.auth)
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-center w-full">
        <div className="flex justify-center mb-4">
          <TicketIcon className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to QuickDesk</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create and manage your support tickets with ease.
        </p>
      </div>
      <div className="absolute top-20 right-20 flex space-x-4">
        
        <Link to="/dashboard" className="text-blue-600 font-semibold">Dashboard</Link>
    { user && (
  <>
    {/* <Link to="/admin" className="text-gray-600 hover:text-blue-600">Admin</Link> */}
    {/* <BellIcon className="h-6 w-6 text-gray-600" /> */}
    {/* <UserCircleIcon className="h-6 w-6 text-gray-600" /> */}
  </>
)}

      </div>
    </header>
  )
}

export default DashboardHeader
