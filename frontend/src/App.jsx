// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Signup from './components/Signup'
import Tickets from './components/Tickets'
import TicketDetail from './components/TicketDetail'
import CreateTicket from './components/CreateTicket'
import Profile from './components/Profile'
import AdminDashboard from './components/AdminDashboard'
import Dashboard from './pages/Dashboard'
import AskQuestion from './components/AskQuestion'

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes inside layout */}
        <Route element={<Layout  />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/ask-question" element={<AskQuestion />} />

        {/* Standalone routes outside layout (no navbar/header) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
