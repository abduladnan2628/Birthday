import React from 'react';
import type { Message } from '../App';

type MessagesProps = {
  messages: Message[];
};

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No messages yet. Be the first to send birthday wishes!</p>
        </div>
      ) : (
        messages.map(message => (
          <div
            key={message.id}
            className="bg-white rounded-lg shadow-md p-6 transform transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{message.name}</h3>
              <span className="text-sm text-gray-500">
                {new Date(message.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">{message.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;