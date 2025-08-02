// components/TicketCard.jsx
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  TicketIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'

function TicketCard({ ticket, status, setStatus, onVote, onStatusUpdate }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg">
        <span>
           Ticket-Id: {ticket._id}    
            </span>
      <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-3">
        <TicketIcon className="h-6 w-6 text-blue-600 mr-2" />
        {ticket.subject}
      </h1>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700 mb-2">
            <span className='font-bold '>Description; </span> 
             {ticket.description}</p>
        <p className="text-gray-600 text-sm">
            <span className='font-bold '> Status: </span> 
            <strong>{ticket.status}</strong></p>
        <p className="text-gray-600 text-sm">
            <span className='font-bold '> Category:  </span> 
             {  ticket.category?.name || 'Uncategorized'}</p>
      </div>

      {/* <div className="flex space-x-3 mb-4">
        <button
          onClick={() => onVote('upvote')}
          className="flex items-center bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-600"
        >
          <ArrowUpIcon className="h-4 w-4 mr-1" />
          Upvote
        </button>
        <button
          onClick={() => onVote('downvote')}
          className="flex items-center bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600"
        >
          <ArrowDownIcon className="h-4 w-4 mr-1" />
          Downvote
        </button>
      </div> */}

      <div className="flex items-center space-x-3 mb-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <button
          onClick={onStatusUpdate}
          className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700"
        >
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          Update Status
        </button>
      </div>
    </div>
  )
}

export default TicketCard
