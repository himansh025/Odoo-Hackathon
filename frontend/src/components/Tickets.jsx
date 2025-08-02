import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FunnelIcon, TagIcon, ArrowsUpDownIcon, TicketIcon } from '@heroicons/react/24/outline'
import axiosInstance from '../Config/apiconfig'

function Tickets() {
  const [tickets, setTickets] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('/tickets/tickets', {
          params: {
            status: statusFilter,
            category: categoryFilter,
            sort: sortBy,
          },
        })
        setTickets(response.data)
      } catch (error) {
        console.error('Failed to fetch tickets:', error)
      }
    }

    fetchTickets()
  }, [statusFilter, categoryFilter, sortBy])

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <TicketIcon className="h-8 w-8 text-blue-600 mr-2" />
        Tickets
      </h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Status Filter */}
        <div className="flex items-center">
          <FunnelIcon className="h-5 w-5 text-gray-600 mr-2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center">
          <TagIcon className="h-5 w-5 text-gray-600 mr-2" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            {/* Add more as needed */}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center">
          <ArrowsUpDownIcon className="h-5 w-5 text-gray-600 mr-2" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort By</option>
            <option value="replies">Most Replied</option>
            <option value="recent">Recently Modified</option>
          </select>
        </div>
      </div>

      {/* Ticket List */}
      <div className="grid gap-4">
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <div
              key={ticket._id}
              className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Link to={`/tickets/${ticket._id}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                  {ticket.subject}
                </h2>
              </Link>
              <p className="text-gray-600">Status: {ticket.status}</p>
              <p className="text-gray-600">
                Category: {ticket.category?.name || 'Uncategorized'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Created by: {ticket.createdBy?.name || 'Unknown'}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tickets found for the selected filters.</p>
        )}
      </div>
    </div>
  )
}

export default Tickets
