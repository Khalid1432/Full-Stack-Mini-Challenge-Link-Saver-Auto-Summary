import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post('/register', { email, password });
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto mt-10">
      <input
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)}
        placeholder="Email"
        className="block w-full p-2 border mb-4"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="block w-full p-2 border mb-4"
        required
      />
      
      <button
        className="bg-green-600 text-white px-4 py-2 w-full cursor-pointer"
        disabled={loading}>
        {
          loading ? 'Registering...' : 'Register'
        }
      </button>
    </form>
  );
};

export default Register;