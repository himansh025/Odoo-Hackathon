import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Config/apiconfig';
import FilterBar from '../components/FilterBar';
import DashboardTicketCard from '../components/DashboardTickedCard';
import EmptyState from '../components/EmptyState';
import Navbar from '../components/Navbar'; // Make sure this exists
import { useSelector } from 'react-redux';

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('mostComment');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {user}= useSelector((state)=>state.auth)
  const navigate = useNavigate();

  const clearFilters = () => {
    setStatusFilter('');
    setCategoryFilter('');
    setSearchTerm('');
    setSortBy('mostComment');
  };

  const handleAsk = () => {
    if(!user){ navigate("/login")

    }else{
    navigate('/create-ticket', { state: { categories } });}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // fetch filtered tickets
        if(user){
        const response = await axiosInstance.get('/ticket/tickets', {
          params: {
            status: statusFilter || undefined,
            category: categoryFilter || undefined,
            sort: sortBy || undefined,
            search: searchTerm || undefined,
          },
        });

        const data = response.data|| [];
        console.log(data)
        setTickets(data);
      

        // fetch categories once
        if (categories.length === 0) {
          const catRes = await axiosInstance.get('/category/categories');
          const catData = catRes.data?.data || catRes.data || [];
          setCategories(catData);
        }
      }
      else{
          const response = await axiosInstance.get('/ticket/ticketsall');

        const data = response.data|| [];
        console.log(data)
        setTickets(data);
      
          if (categories.length === 0) {
          const catRes = await axiosInstance.get('/category/categoriesall');
          const catData = catRes.data?.data || catRes.data || [];
          setCategories(catData);
        }
      }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tickets');;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [statusFilter, categoryFilter, sortBy, searchTerm]);

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      {/* <Navbar /> */}

      <div className="container mx-auto px-4 py-6">
        {/* Error Display */}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          clearFilters={clearFilters}
          handleAsk={handleAsk}
        />

        {/* Active Filters Info */}
        {(statusFilter || categoryFilter || searchTerm) && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4 text-blue-800 text-sm">
            Active filters:
            {statusFilter && ` Status: ${statusFilter}`}
            {categoryFilter && ` Category: ${categoryFilter}`}
            {searchTerm && ` Search: "${searchTerm}"`}
          </div>
        )}

     {tickets.length === 0 ? (
  <EmptyState
    filtersActive={statusFilter || categoryFilter || searchTerm}
    clearFilters={clearFilters}
  />
) : (
  <div className="grid grid-cols-1 gap-4">
    {tickets.map((ticket) => (
      <DashboardTicketCard key={ticket._id} ticket={ticket} />
    ))}
  </div>
)}
      </div>
    </div>
  );
}

export default Dashboard;
