import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../Config/apiconfig';
import { useDispatch } from 'react-redux';
import { login } from '../Store/authSlicer'; // adjust path if needed

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/login', { email, password });

      const { token, user } = response.data;

      // Store token in sessionStorage for interceptor to attach
      sessionStorage.setItem('token', token);

      // Dispatch login action with user
      dispatch(login({ user }));

      // Navigate to main page
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.response?.data?.message || 'Login error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-center mb-6">
        <LockClosedIcon className="h-12 w-12 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <LockClosedIcon className="h-5 w-5 mr-2" />
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
