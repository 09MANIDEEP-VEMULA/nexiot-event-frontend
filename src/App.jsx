import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

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

import ServerError from '../src/Pages/serverError.jsx';

/* -----------------------------
   PROTECTED ROUTE
------------------------------*/
const ProtectedRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/* -----------------------------
   ROUTES WRAPPER (for animation fix)
------------------------------*/
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/problems" element={<ProblemStatements />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />

        {/* ERROR ROUTES */}
        <Route path="/404" element={<NotFound />} />
        <Route path="/500" element={<ServerError />} />

        {/* PROTECTED USER ROUTE */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ONLY ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/404" replace />} />

      </Routes>
    </AnimatePresence>
  );
}

/* -----------------------------
   APP ROOT
------------------------------*/
export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
            {/* NAVBAR (always visible) */}
            <Navbar />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}