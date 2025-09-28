import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

const MainSite: React.FC = () => (
  <div className="App rtl">
    <Header />
    <Hero />
    <Services />
    <About />
    <Portfolio />
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
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;