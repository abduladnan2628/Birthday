import React from 'react';
import Confetti from './Confetti';

const Home: React.FC = () => {
  return (
    <div className="relative">
      <Confetti />
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
          <img
            src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84"
            alt="Birthday Person"
            className="w-full h-[60vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Happy Birthday Sarah!
            </h1>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
          Wishing you a day filled with joy, laughter, and unforgettable moments.
          May this year bring you endless opportunities and beautiful surprises!
        </p>
      </div>
    </div>
  );
};

export default Home;