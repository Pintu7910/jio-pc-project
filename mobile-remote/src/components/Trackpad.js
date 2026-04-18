import React, { useRef, useState } from 'react';

export default function Trackpad({ socket }) {
  const trackpadRef = useRef(null);
  const [lastTouch, setLastTouch] = useState(null);

  const handleTouchMove = (e) => {
    if (!socket || !e.touches[0]) return;
    
    const touch = e.touches[0];
    
    if (lastTouch) {
      // Sensitivity multiplier (2.0) add kiya hai movement badhane ke liye
      const dx = (touch.clientX - lastTouch.x) * 2.0;
      const dy = (touch.clientY - lastTouch.y) * 2.0;

      // Sirf tab bhejenge jab movement significant ho (minimum 0.5 pixels)
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        socket.emit('tv-move-cursor', { dx, dy });
      }
    }
    
    setLastTouch({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setLastTouch(null); 
  };

  return (
    <div 
      ref={trackpadRef}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // 'touch-none' property ensure karti hai ki browser scroll na ho
      className="w-full aspect-square bg-slate-900 rounded-[2rem] border-4 border-white/20 flex items-center justify-center relative touch-none active:border-blue-500 shadow-2xl"
    >
      <div className="text-slate-500 font-bold text-xs uppercase opacity-40">
        Drag to Move Cursor
      </div>
    </div>
  );
}
