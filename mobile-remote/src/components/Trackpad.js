import React, { useRef, useState } from 'react';

export default function Trackpad({ socket }) {
  const trackpadRef = useRef(null);
  const [lastTouch, setLastTouch] = useState(null);

  const handleTouchMove = (e) => {
    if (!socket || !e.touches[0]) return;
    
    const touch = e.touches[0];
    
    if (lastTouch) {
      // Pichli position aur abhi ki position ka farq (Difference)
      const dx = touch.clientX - lastTouch.x;
      const dy = touch.clientY - lastTouch.y;

      // TV App ko signal bhej rahe hain
      socket.emit('tv-move-cursor', { dx, dy });
    }
    
    setLastTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setLastTouch(null); // Touch hatate hi reset
  };

  return (
    <div 
      ref={trackpadRef}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-full aspect-square bg-slate-900 rounded-[2rem] border-2 border-white/10 flex items-center justify-center relative touch-none active:border-blue-500"
    >
      <div className="text-slate-600 font-bold text-xs uppercase opacity-50">
        Trackpad Area
      </div>
    </div>
  );
}
