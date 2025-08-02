import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusCircleIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../Config/apiconfig';

function CreateTicket() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Get pre-selected category from navigation state
  const preSelectedCategory = location.state?.preSelectedCategory || '';
console.log("dsc",preSelectedCategory)
  // Fetch categories on component mount
  useEffect(() => {
   
        // Set pre-selected category if it exists and matches a category
        if (preSelectedCategory) {
          const matchingCategory = categoriesData.find(cat => 
            cat.name === preSelectedCategory || cat._id === preSelectedCategory
          );
          if (matchingCategory) {
            setCategory(matchingCategory._id);
          }
    
    };
  }, [preSelectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !description || !category) {
      return alert('Please fill all required fields');
    }

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('description', description);
    formData.append('category', category);
    if (attachment) formData.append('attachment', attachment);

    try {
      const res = await axiosInstance.post('/ticket/tickets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res?.data?.ticket) {
        navigate('/dashboard');
      } else {
        alert('Ticket creation failed');
      }
    } catch (err) {
      console.error('Create ticket error:', err);
      alert(err?.response?.data?.error || 'Something went wrong');
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center text-gray-600">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <PlusCircleIcon className="h-8 w-8 text-blue-600 mr-2" />
        Create Ticket
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ticket subject"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your issue"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Attachment (Optional)</label>
          <div className="flex items-center">
            <PaperClipIcon className="h-5 w-5 text-gray-600 mr-2" />
            <input
              type="file"
              name="attachment"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Create Ticket
        </button>
      </form>
    </div>
  );
}

export default CreateTicket;