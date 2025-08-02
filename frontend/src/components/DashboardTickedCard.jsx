import { Link } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

function DashboardTicketCard({ ticket }) {
    console.log(ticket)
  return (
    <Link to={`/tickets/${ticket?._id}`}>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-blue-600">{ticket?.subject}</h3>
            <div className="flex space-x-2 text-sm text-gray-600">
              <span className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-1" />{ticket?.category?.name || ticket?.category}</span>
              <span className="flex items-center"><CheckCircleIcon className="h-4 w-4 mr-1" />{ticket?.status}</span>
            </div>
            <p className="text-sm text-gray-500">Posted by {ticket?.createdBy?.name}</p>
          </div>
          <div className="text-right text-sm text-gray-600">Comments: {ticket?.comments?.length || 0}</div>
        </div>
      </div>
    </Link>
  )
}

export default DashboardTicketCard
