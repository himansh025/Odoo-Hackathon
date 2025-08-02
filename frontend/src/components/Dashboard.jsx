import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BellIcon, UserCircleIcon, MagnifyingGlassIcon, PlusCircleIcon, ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [categories, setCategories] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortBy, setSortBy] = useState('mostComment')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const ticketsResponse = await axios.get('/api/tickets', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { status: statusFilter, category: categoryFilter, sort: sortBy, search: searchTerm }
        })
        console.log('Tickets Response:', ticketsResponse)
        setTickets(ticketsResponse.data?.data || [])
        const categoriesResponse = await axios.get('/api/categories', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        console.log('Categories Response:', categoriesResponse)
        setCategories(categoriesResponse.data?.data || categoriesResponse.data || [])
      } catch (error) {
        console.error('Fetch Error:', error)
        setCategories([])
        setTickets([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [statusFilter, categoryFilter, sortBy, searchTerm])

  const handleAsk = () => {
    navigate('/create-ticket')
  }

  if (loading) {
    return <div className="text-center text-gray-600 p-6">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/dashboard" className="text-blue-600 font-semibold">Dashboard</Link>
          <Link to="/admin" className="text-gray-600 hover:text-blue-600">Admin</Link>
        </div>
        <div className="flex space-x-4">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <UserCircleIcon className="h-6 w-6 text-gray-600" />
        </div>
      </header>
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Categories</option>
              {Array.isArray(categories) ? categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              )) : null}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mostComment">Most comment</option>
              <option value="mostUpvote">Most upvote</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="search"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 absolute left-3 top-2" />
            </div>
            <button
              onClick={handleAsk}
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Ask
            </button>
          </div>
        </div>
        <div className="grid gap-4">
          {tickets.map(ticket => (
            <div key={ticket._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600">{ticket.subject}</h3>
                  <div className="flex space-x-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      {ticket.category.name}
                    </span>
                    <span className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Posted by {ticket.createdBy.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Number of conv: {ticket.comments.length}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard