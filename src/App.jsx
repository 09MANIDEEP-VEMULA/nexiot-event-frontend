import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { AuthProvider } from './context/AuthContext.jsx';
import { AppProvider } from './context/AppContext.jsx';

// Pages
import Home from './Pages/Home.jsx';
import About from './Pages/About';
import ProblemStatements from './Pages/ProblemStatements';
import Tracks from './Pages/Tracks';
import Team from './Pages/Team';
import Contact from './Pages/Contact';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Payment from './Pages/Payment';
import Dashboard from './Pages/Dashboard';
import AdminPanel from './Pages/AdminPanel';
import NotFound from './Pages/NotFound';
import ServerError from './Pages/ServerError';


// =======================
// Protected Route
// =======================
const ProtectedRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && userRole !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


// =======================
// App
// =======================
function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="bg-black text-white overflow-hidden">

            <Navbar />

            <AnimatePresence mode="wait">
              <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/tracks" element={<Tracks />} />
                <Route path="/problems" element={<ProblemStatements />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/payment" element={<Payment />} />

                {/* Error Pages */}
                <Route path="/404" element={<NotFound />} />
                <Route path="/500" element={<ServerError />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute isAdmin={true}>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />

                {/* Catch All (ONLY ONE) */}
                <Route path="*" element={<Navigate to="/404" replace />} />

              </Routes>
            </AnimatePresence>

            <Footer />

          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;