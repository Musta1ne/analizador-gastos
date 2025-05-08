import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a]">
      <h1 className="text-4xl font-bold text-white mb-8 tracking-wider">
        <span className="text-[#87CEEB]">MONEY</span>{' '}
        <span className="text-[#FF0000]">RING</span>
      </h1>
      <LoginForm />
    </div>
  );
};

export default Login;