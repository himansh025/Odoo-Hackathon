import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserPlusIcon } from '@heroicons/react/24/outline'
import axiosInstance from '../Config/apiconfig'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post('/api/users/register', { name, email, password })
     if(response){
      console.log(response.data)
      navigate('/tickets')

     }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-center mb-6">
        <UserPlusIcon className="h-12 w-12 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Signup</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Signup
        </button>
      </div>
    </div>
  )
}

export default Signup