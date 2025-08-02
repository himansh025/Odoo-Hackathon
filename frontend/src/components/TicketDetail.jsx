// components/TicketDetail.jsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../Config/apiconfig'
import TicketCard from './TicketCard'
import Comment from './Comment'

function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axiosInstance.get(`/ticket/tickets/${id}`)
        setTicket(res.data)
        setStatus(res.data.status)
      } catch (err) {
        console.error('Error fetching ticket:', err)
      }
    }
    fetchTicket()
  }, [id])

  const handleStatusUpdate = async () => {
    try {
      await axiosInstance.put(`/ticket/tickets/${id}/status`, { status })
      setTicket((prev) => ({ ...prev, status }))
    } catch (err) {
      console.error('Status update failed:', err)
    }
  }

  const handleCommentSubmit = async () => {
    try {
      await axiosInstance.post(`/ticket/tickets/${id}/comments`, { text: comment })
      setComment('')
      const res = await axiosInstance.get(`/ticket/tickets/${id}`)
      setTicket(res.data)
    } catch (err) {
      console.error('Comment submission failed:', err)
    }
  }

  if (!ticket) return <div className="text-center text-gray-600">Loading ticket...</div>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <TicketCard
        ticket={ticket}
        status={status}
        setStatus={setStatus}
        onStatusUpdate={handleStatusUpdate}
      />

      <Comment
        comment={comment}
        setComment={setComment}
        onSubmit={handleCommentSubmit}
        comments={ticket.comments}
      />
    </div>
  )
}

export default TicketDetail