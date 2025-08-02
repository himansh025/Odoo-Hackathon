import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PlusCircleIcon, PaperClipIcon } from '@heroicons/react/24/outline'

function CreateTicket() {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [attachment, setAttachment] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('subject', subject)
    formData.append('description', description)
    formData.append('category', category)
    if (attachment) formData.append('attachment', attachment)

    try {
      await axios.post('/api/tickets', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      navigate('/tickets')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <PlusCircleIcon className="h-8 w-8 text-blue-600 mr-2" />
        Create Ticket
      </h1>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ticket subject"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your issue"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Attachment</label>
          <div className="flex items-center">
            <PaperClipIcon className="h-5 w-5 text-gray-600 mr-2" />
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Create Ticket
        </button>
      </div>
    </div>
  )
}

export default CreateTicket