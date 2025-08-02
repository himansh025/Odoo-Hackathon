import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import DashboardHeader from './DashboardHeader'

function Layout() {
  const location = useLocation()
  const isDashboard = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      <Navbar />    
      {isDashboard && <DashboardHeader  />}  {/* Below Navbar */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
