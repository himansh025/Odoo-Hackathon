import { TicketIcon } from '@heroicons/react/24/outline'

function Home() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <TicketIcon className="h-16 w-16 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to QuickDesk</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">Create and manage your support tickets with ease. Our platform ensures quick resolution and seamless communication with our support team.</p>
    </div>
  )
}

export default Home