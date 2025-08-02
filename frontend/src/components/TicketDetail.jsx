import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ChatBubbleLeftIcon, ArrowUpIcon, ArrowDownIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`/api/tickets/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setTicket(response.data.data)
        setStatus(response.data.data.status)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTicket()
  }, [id])

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`/api/comments/${id}`, { text: comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setComment('')
      const response = await axios.get(`/api/tickets/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setTicket(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleStatusUpdate = async () => {
    try {
      await axios.patch(`/api/tickets/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setTicket(prev => ({ ...prev, status }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleVote = async (voteType) => {
    try {
      await axios.post(`/api/tickets/${id}/vote`, { vote: voteType }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (!ticket) return <div className="text-center text-gray-600">Loading...</div>

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
        <TicketIcon className="h-8 w-8 text-blue-600 mr-2" />
        {ticket.subject}
      </h1>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700 mb-2">{ticket.description}</p>
        <p className="text-gray-600">Status: {ticket.status}</p>
        <p className="text-gray-600">Category: {ticket.category.name}</p>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleVote('upvote')}
          className="flex items-center bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <ArrowUpIcon className="h-5 w-5 mr-1" />
          Upvote
        </button>
        <button
          onClick={() => handleVote('downvote')}
          className="flex items-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <ArrowDownIcon className="h-5 w-5 mr-1" />
          Downvote
        </button>
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <div className="flex items-center">
          <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-2" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button
          onClick={handleStatusUpdate}
          className="flex items-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <CheckCircleIcon className="h-5 w-5 mr-1" />
          Update Status
        </button>
      </div>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <ChatBubbleLeftIcon className="h-5 w-5 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a comment"
          rows="4"
        ></textarea>
        <button
          onClick={handleCommentSubmit}
          className="mt-2 flex items-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
          Add Comment
        </button>
      </div>
      <div>
        {ticket.comments.map(comment => (
          <div key={comment._id} className="bg-gray-50 p-4 rounded-lg shadow mb-2">
            <p className="text-gray-700">{comment.text}</p>
            <p className="text-sm text-gray-500">By: {comment.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TicketDetail