
import React from 'react';
import { User } from '../types';
import Button from '../components/Button';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">S</div>
              <span className="text-xl font-bold text-slate-900">SecureAuth</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-500 hidden sm:inline">Logged in as <strong>{user.uname}</strong></span>
              <Button variant="secondary" onClick={onLogout} size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">User Dashboard</h1>
          <p className="text-slate-500 mt-2">Welcome back to your secure space.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Profile Information
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Full Name</p>
                  <p className="text-slate-900 font-medium">{user.uname}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">User ID</p>
                  <p className="text-slate-900 font-medium">@{user.uid}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Email Address</p>
                  <p className="text-slate-900 font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Phone Number</p>
                  <p className="text-slate-900 font-medium">{user.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-4 bg-indigo-50 rounded-xl flex items-start space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-indigo-900">Security Note</h4>
                <p className="text-sm text-indigo-700 mt-1">
                  Your password is stored as a secure SHA-256 hash. Even system administrators cannot see your original password.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Account Status</h3>
              <div className="flex items-center space-x-2 text-green-600 font-semibold mb-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Active</span>
              </div>
              <p className="text-xs text-slate-500">Member since {new Date().toLocaleDateString()}</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-lg shadow-indigo-200 text-white">
              <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-indigo-100 text-sm mb-4">Get access to advanced multi-factor authentication and audit logs.</p>
              <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white border-none w-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
