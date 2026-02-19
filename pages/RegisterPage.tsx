
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { register } from '../services/authService';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    uid: '',
    uname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const { confirmPassword: _, ...userData } = formData;
    
    const result = await register(userData);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-500">Enter your details to register</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="User ID (unique)"
            name="uid"
            required
            value={formData.uid}
            onChange={handleChange}
            placeholder="johndoe123"
          />
          <Input
            label="Full Name"
            name="uname"
            required
            value={formData.uname}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <Button type="submit" isLoading={isLoading} className="w-full h-11 text-base mt-2">
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-500">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
