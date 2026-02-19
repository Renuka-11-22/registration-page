
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { AuthState, User } from './types';
import { getCurrentUser, logout } from './services/authService';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (err) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };
    checkSession();
  }, []);

  const handleLogout = () => {
    logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            authState.isAuthenticated 
              ? <Navigate to="/dashboard" replace /> 
              : <LoginPage onLoginSuccess={(user) => setAuthState({ user, isAuthenticated: true, isLoading: false, error: null })} />
          } 
        />
        <Route 
          path="/register" 
          element={
            authState.isAuthenticated 
              ? <Navigate to="/dashboard" replace /> 
              : <RegisterPage />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            authState.isAuthenticated 
              ? <DashboardPage user={authState.user!} onLogout={handleLogout} /> 
              : <Navigate to="/login" replace />
          } 
        />
        <Route path="*" element={<Navigate to={authState.isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
