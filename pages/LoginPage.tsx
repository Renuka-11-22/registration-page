
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../services/authService';
import { User } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await login(formData.email, formData.password);
    
    if (result.success && result.user) {
      onLoginSuccess(result.user);
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />

          <Button type="submit" isLoading={isLoading} className="w-full h-11 text-base">
            Sign In
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-500">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
