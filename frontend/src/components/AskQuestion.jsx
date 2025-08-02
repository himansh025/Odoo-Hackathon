import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

function AskQuestion() {
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/tickets', {
        subject: `Question: ${description.split('\n')[0] || 'New Question'}`,
        description,
        category: tags.split(',').map(tag => tag.trim())[0] || 'General',
        status: 'Open'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      navigate('/tickets')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <PlusCircleIcon className="h-8 w-8 text-blue-600 mr-2" />
        Ask a Question
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your question..."
            rows="6"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., tech, support"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Post
        </button>
      </form>
    </div>
  )
}

export default AskQuestion