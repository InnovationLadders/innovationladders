import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MailOpen, 
  Trash2, 
  Reply, 
  Archive, 
  Filter,
  Search,
  Calendar,
  User,
  Building,
  Phone,
  MessageSquare,
  X
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { ContactMessage } from '../../types/admin';

const MessagesManager: React.FC = () => {
  const { messages, updateMessage, deleteMessage } = useAdmin();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusOptions = [
    { value: 'all', label: 'جميع الرسائل', count: messages.length },
    { value: 'new', label: 'جديد', count: messages.filter(m => m.status === 'new').length },
    { value: 'read', label: 'مقروء', count: messages.filter(m => m.status === 'read').length },
    { value: 'replied', label: 'تم الرد', count: messages.filter(m => m.status === 'replied').length },
    { value: 'archived', label: 'مؤرشف', count: messages.filter(m => m.status === 'archived').length }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (message.status === 'new') {
      updateMessage(message.id, { status: 'read' });
    }
  };

  const handleStatusChange = (messageId: string, status: ContactMessage['status']) => {
    updateMessage(messageId, { status });
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage({ ...selectedMessage, status });
    }
  };

  const getStatusColor = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-600';
      case 'read': return 'bg-blue-100 text-blue-600';
      case 'replied': return 'bg-green-100 text-green-600';
      case 'archived': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: ContactMessage['status']) => {
    switch (status) {
      case 'new': return 'جديد';
      case 'read': return 'مقروء';
      case 'replied': return 'تم الرد';
      case 'archived': return 'مؤرشف';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إدارة الرسائل</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="البحث في الرسائل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {statusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setFilterStatus(option.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === option.value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-h-[600px] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد رسائل</p>
              </div>
            ) : (
              filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMessageClick(message)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-primary-50 border-primary-200' : ''
                  } ${message.status === 'new' ? 'bg-red-50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {message.status === 'new' ? (
                        <Mail className="w-4 h-4 text-red-500" />
                      ) : (
                        <MailOpen className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="font-medium text-gray-900">{message.name}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                      {getStatusLabel(message.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{message.email}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">
                      {new Date(message.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                    {message.service && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {message.service}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedMessage.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Mail className="w-4 h-4" />
                      <span>{selectedMessage.email}</span>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Phone className="w-4 h-4" />
                        <span>{selectedMessage.phone}</span>
                      </div>
                    )}
                    {selectedMessage.company && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Building className="w-4 h-4" />
                        <span>{selectedMessage.company}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedMessage.createdAt).toLocaleString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Service */}
              {selectedMessage.service && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">الخدمة المطلوبة</label>
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm">
                    {selectedMessage.service}
                  </span>
                </div>
              )}

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <label className="text-sm font-medium text-gray-700">تغيير الحالة:</label>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as ContactMessage['status'])}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="new">جديد</option>
                    <option value="read">مقروء</option>
                    <option value="replied">تم الرد</option>
                    <option value="archived">مؤرشف</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <button
                    onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                    className="btn-primary flex items-center"
                  >
                    <Reply className="w-4 h-4 ml-2" />
                    رد
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedMessage.id, 'archived')}
                    className="btn-secondary flex items-center"
                  >
                    <Archive className="w-4 h-4 ml-2" />
                    أرشفة
                  </button>
                  <button
                    onClick={() => {
                      deleteMessage(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                    className="p-2 text-red-600 hover:text-red-700 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">اختر رسالة لعرضها</h3>
              <p className="text-gray-500">انقر على أي رسالة من القائمة لعرض تفاصيلها</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesManager;