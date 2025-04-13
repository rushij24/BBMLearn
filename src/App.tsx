import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import LabsPage from './pages/LabsPage';
import PlaygroundPage from './pages/PlaygroundPage';
import CTFPage from './pages/CTFPage';
import LearningPage from './pages/LearningPage';
import LearningTimelinePage from './pages/LearningTimelinePage';
import LearningPathPage from './pages/LearningPathPage';
import ModulePage from './pages/ModulePage';
import LabPage from './pages/LabPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import FloatingAIAssistant from './components/FloatingAIAssistant';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Dashboard routes through MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="learning" element={<LearningPage />} />
          <Route path="learning/timeline" element={<LearningTimelinePage />} />
          <Route path="learning/path/:pathId" element={<LearningPathPage />} />
          <Route path="learning/module/:moduleId" element={<ModulePage />} />
          <Route path="learning/lab/:labId" element={<LabPage />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
          <Route path="labs" element={<LabsPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="ctf" element={<CTFPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingAIAssistant />
    </Router>
  );
}

export default App;