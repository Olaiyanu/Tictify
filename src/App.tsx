/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';
import ManageEvents from './pages/ManageEvents';

// Route Guard
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/signup" replace />;
  }

  return <>{children}</>;
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/events" 
            element={
              <ProtectedRoute>
                <ManageEvents />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-event" 
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            } 
          />
          {/* Add a fallback or redirect if needed */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
