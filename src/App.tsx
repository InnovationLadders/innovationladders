import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Competitions from './components/Competitions';
import Opportunities from './components/Opportunities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import OdooPage from './pages/OdooPage';
import MashroiPage from './pages/MashroiPage';
import TryHubPage from './pages/TryHubPage';

const MainSite: React.FC = () => (
  <div className="App rtl">
    <Header />
    <Hero />
    <Services />
    <About />
    <Portfolio />
    <Competitions />
    <Opportunities />
    <Contact />
    <Footer />
  </div>
);

const AdminRoute: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/odoo" element={<OdooPage />} />
          <Route path="/mashroi" element={<MashroiPage />} />
          <Route path="/tryhub" element={<TryHubPage />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;