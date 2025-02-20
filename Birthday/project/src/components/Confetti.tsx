import React, { useEffect } from 'react';

const Confetti: React.FC = () => {
  useEffect(() => {
    const colors = ['#ff69b4', '#ff1493', '#ff69b4', '#ff8da1', '#ffc0cb'];
    const numConfetti = 50;
    
    const createConfetti = () => {
      const confetti = document.createElement('div');
      const initialX = Math.random() * window.innerWidth;
      
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${initialX}px;
        opacity: 0;
        transform: rotate(${Math.random() * 360}deg);
        pointer-events: none;
        z-index: 1;
      `;
      
      document.body.appendChild(confetti);
      
      const animation = confetti.animate([
        {
          top: '-10px',
          opacity: 1,
          transform: `rotate(${Math.random() * 360}deg)`,
        },
        {
          top: '100vh',
          opacity: 0,
          transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 200 - 100}px)`,
        }
      ], {
        duration: Math.random() * 2000 + 3000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      });
      
      animation.onfinish = () => confetti.remove();
    };

    const interval = setInterval(() => {
      for (let i = 0; i < numConfetti; i++) {
        setTimeout(createConfetti, Math.random() * 2000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Confetti;