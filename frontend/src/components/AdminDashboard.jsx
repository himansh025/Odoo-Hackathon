import { useState, useEffect } from 'react'
import axios from 'axios'
import { TagIcon, UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ShieldCheckIcon } from 'lucide-react'
import axiosInstance from '../Config/apiconfig'

function AdminDashboard() {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [roleRequests, setRoleRequests] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axiosInstance.get('/api/categories', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        const roleRequestResponse = await axios.get('/api/users/admin/user/allReq', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setCategories(categoryResponse.data)
        setRoleRequests(roleRequestResponse.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post('/api/categories', { name: newCategory }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setCategories([...categories, response.data.category])
      setNewCategory('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateRole = async (userId, role) => {
    try {
      await axios.put(`/api/users/admin/update-role/${userId}`, { role }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setRoleRequests(roleRequests.filter(req => req.id !== userId))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <ShieldCheckIcon className="h-8 w-8 text-blue-600 mr-2" />
        Admin Dashboard
      </h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <TagIcon className="h-6 w-6 text-blue-600 mr-2" />
          Create Category
        </h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
          />
          <button
            onClick={handleCreateCategory}
            className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create
          </button>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <TagIcon className="h-6 w-6 text-blue-600 mr-2" />
          Categories
        </h2>
        <ul className="grid gap-2">
          {categories.map(category => (
            <li key={category.id} className="p-3 bg-gray-50 rounded-lg">{category.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <UserGroupIcon className="h-6 w-6 text-blue-600 mr-2" />
          Role Requests
        </h2>
        {roleRequests.map(request => (
          <div key={request.id} className="bg-gray-50 p-4 rounded-lg shadow mb-2">
            <p className="text-gray-700"><span className="font-medium">Name:</span> {request.name}</p>
            <p className="text-gray-700"><span className="font-medium">Email:</span> {request.email}</p>
            <p className="text-gray-700"><span className="font-medium">Requested Role:</span> {request.requestedRole}</p>
            <button
              onClick={() => handleUpdateRole(request.id, request.requestedRole)}
              className="mt-2 flex items-center bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard