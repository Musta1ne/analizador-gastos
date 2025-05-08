import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import GoogleSignIn from './GoogleSignIn';
import { authService } from '../../services/authService';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await authService.register(formData);
      navigate('/dashboard'); // Redirigir al dashboard después del registro
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#87CEEB] to-[#FF0000] p-8 rounded-2xl shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">SIGN UP</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          type="text"
          placeholder="Enter username..."
          value={formData.username}
          onChange={handleChange}
          name="username"
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter email..."
          value={formData.email}
          onChange={handleChange}
          name="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password..."
          value={formData.password}
          onChange={handleChange}
          name="password"
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm password..."
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
        />
        <div className="space-y-4 pt-2">
          <Button type="submit" fullWidth className="bg-black hover:bg-gray-800">
            Sign up
          </Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-600">or</span>
            </div>
          </div>
          <GoogleSignIn />
        </div>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;