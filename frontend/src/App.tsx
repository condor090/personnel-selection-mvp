import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Positions from './pages/Positions';
import Candidates from './pages/Candidates';
import Applications from './pages/Applications';
import Assessments from './pages/Assessments';
import Reports from './pages/Reports';
import PositionDetail from './pages/PositionDetail';
import CandidateDetail from './pages/CandidateDetail';
import ApplicationDetail from './pages/ApplicationDetail';
import NewApplication from './pages/NewApplication';
import BeltSystem from './pages/BeltSystem';
import Checkpoints from './pages/Checkpoints';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="positions" element={<Positions />} />
        <Route path="positions/:id" element={<PositionDetail />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="candidates/:id" element={<CandidateDetail />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/new" element={<NewApplication />} />
        <Route path="applications/:id" element={<ApplicationDetail />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="reports" element={<Reports />} />
        <Route path="belts" element={<BeltSystem />} />
        <Route path="checkpoints" element={<Checkpoints />} />
      </Route>
    </Routes>
  );
}

export default App;