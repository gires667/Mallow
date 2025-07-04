
import React, { useState } from 'react';
import { ArrowLeft, Send, Plus } from 'lucide-react';

const MessageModal = ({ appointment, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Lorem ipsum dolor asit',
      time: '08:22',
      isUser: false
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor asit.',
      time: '08:23',
      isUser: true
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor asit. met, lorem ipsum dolor asit met.',
      time: '08:24',
      isUser: true
    },
    {
      id: 4,
      text: 'Lorem ipsum dolor asit met. Lorem ipsum dolor asit met.',
      time: '08:25',
      isUser: false
    },
    {
      id: 5,
      text: 'Lorem ipsum dolor asit. met, lorem ipsum dolor asit met.',
      time: '08:27',
      isUser: true
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isUser: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center space-x-3">
          <button onClick={onClose}>
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-600 font-bold">💅</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{appointment?.institute || 'Nails Lab'}</h3>
              <p className="text-sm text-gray-500">Pose vernis semi permanent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-end space-x-2 max-w-xs">
              {!msg.isUser && (
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 text-xs">💅</span>
                </div>
              )}
              <div>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.isUser
                      ? 'bg-green-400 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 px-2">{msg.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="flex items-center space-x-3">
          <button className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <Plus size={20} className="text-white" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrire un message"
              className="w-full bg-gray-100 rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
            >
              <Send size={16} className="text-green-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
