import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import MessagesManager from './MessagesManager';

type TabType = 'messages';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAdmin();

  const tabs = [
    { id: 'messages', name: 'الرسائل', icon: MessageSquare },
  ];

  const renderContent = () => {
    return <MessagesManager />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">لوحة التحكم</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-right transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5 ml-3" />
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-xs text-gray-500">{currentUser?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:mr-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900 mr-4">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm text-gray-500">
                آخر تسجيل دخول: {new Date().toLocaleDateString('ar-SA')}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;