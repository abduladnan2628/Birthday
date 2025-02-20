import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

type NavLink = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type NavigationProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
  links: NavLink[];
};

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, links }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 space-x-8">
          {links.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                ${currentPage === id 
                  ? 'text-pink-600 bg-pink-50' 
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;