import React, { useRef } from 'react';

export default function Trackpad({ socket }) {
  const trackpadRef = useRef(null);

  const handleTouchMove = (e) => {
    if (!socket) return;
    const touch = e.touches[0];
    const rect = trackpadRef.current.getBoundingClientRect();
    
    // Finger ki position calculate ho rahi hai
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;

    socket.emit('mouse-move', { x, y });
  };

  return (
    <div 
      ref={trackpadRef}
      onTouchMove={handleTouchMove}
      className="w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] border-2 border-white/5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden active:border-blue-500/50 transition-all touch-none"
    >
      <div className="absolute inset-0 opacity-10" 
           style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
      <div className="text-slate-500 font-bold tracking-widest text-xs uppercase opacity-30">
        Sensory Touch Area
      </div>
    </div>
  );
}
