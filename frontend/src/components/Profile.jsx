import { useState, useEffect } from 'react'
import axios from 'axios'
import { UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

function Profile() {
  const [user, setUser] = useState(null)
  const [requestedRole, setRequestedRole] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setUser(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProfile()
  }, [])

  const handleRoleRequest = async () => {
    try {
      await axios.post('/api/users/request-role', { requestedRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setRequestedRole('')
    } catch (error) {
      console.error(error)
    }
  }

  if (!user) return <div className="text-center text-gray-600">Loading...</div>

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <UserIcon className="h-8 w-8 text-blue-600 mr-2" />
        Profile
      </h1>
      <div className="space-y-4">
        <p className="text-gray-700"><span className="font-medium">Name:</span> {user.name}</p>
        <p className="text-gray-700"><span className="font-medium">Email:</span> {user.email}</p>
        <p className="text-gray-700"><span className="font-medium">Role:</span> {user.role}</p>
        <p className="text-gray-700"><span className="font-medium">Interests:</span> {user.categoryInterest.join(', ')}</p>
        <div className="pt-4">
          <label className="block text-gray-700 font-medium mb-2">Request Role Change</label>
          <div className="flex items-center space-x-4">
            <select
              value={requestedRole}
              onChange={(e) => setRequestedRole(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="support-agent">Support Agent</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleRoleRequest}
              className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Request Role
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile