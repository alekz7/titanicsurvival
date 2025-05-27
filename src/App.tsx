import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import DashboardPage from './components/Dashboard/DashboardPage';
import PredictionPage from './components/Prediction/PredictionPage';
import DataExplorationPage from './components/DataExploration/DataExplorationPage';
import AboutPage from './components/About/AboutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="predict" element={<PredictionPage />} />
          <Route path="data" element={<DataExplorationPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;