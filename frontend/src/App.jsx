import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
   import Navbar from './components/Navbar'
   import Home from './components/Home'
   import Login from './components/Login'
   import Signup from './components/Signup'
   import Tickets from './components/Tickets'
   import TicketDetail from './components/TicketDetail'
   import CreateTicket from './components/CreateTicket'
   import Profile from './components/Profile'
   import AdminDashboard from './components/AdminDashboard'
   import Dashboard from './components/Dashboard'
   import AskQuestion from './components/AskQuestion'
  //  import Layout from './components/Layout';
   import { useSelector } from 'react-redux';


   function App() {
     const { user } = useSelector(state => state.auth);
     return (
       <Router>
         <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
           <Navbar />
           {/* <Route element={<Layout />}></Route> */}
           <main className="container mx-auto px-4 py-8">
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/tickets" element={<Tickets />} />
               <Route path="/tickets/:id" element={<TicketDetail />} />
               <Route path="/create-ticket" element={<CreateTicket />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/admin" element={<AdminDashboard />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/ask-question" element={<AskQuestion />} />
             </Routes>
           </main>
         </div>
       </Router>
     )
   }

   export default App