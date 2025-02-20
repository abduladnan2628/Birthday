import React, { useState } from 'react';
import { Heart, Image as ImageIcon, MessageCircle, Send } from 'lucide-react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Messages from './components/Messages';
import SendWishes from './components/SendWishes';

export type Message = {
  id: string;
  name: string;
  message: string;
  timestamp: number;
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (name: string, message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      name,
      message,
      timestamp: Date.now(),
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'gallery':
        return <Gallery />;
      case 'messages':
        return <Messages messages={messages} />;
      case 'send':
        return <SendWishes onSubmit={addMessage} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        links={[
          { id: 'home', label: 'Home', icon: Heart },
          { id: 'gallery', label: 'Gallery', icon: ImageIcon },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
          { id: 'send', label: 'Send Wishes', icon: Send },
        ]} 
      />
      <main className="container mx-auto px-4 pt-20 pb-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;