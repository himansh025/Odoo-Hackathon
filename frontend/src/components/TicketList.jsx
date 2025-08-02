import TicketCard from './TicketCard'

function TicketList({ tickets }) {
  return (
    <div className="grid gap-4">
      {tickets.map(ticket => (
        <TicketCard key={ticket._id} ticket={ticket} />
      ))}
    </div>
  )
}

export default TicketList
