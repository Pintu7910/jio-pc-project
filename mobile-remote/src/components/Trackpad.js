import React, { useRef, useEffect } from 'react';

export default function Trackpad({ socket }) {
  const trackpadRef = useRef(null);
  const lastPos = useRef(null);

  useEffect(() => {
    const el = trackpadRef.current;
    if (!el) return;

    const handleMove = (e) => {
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];

      if (lastPos.current) {
        // Sensitivity 2.8x taaki cursor fast chale
        const dx = (touch.clientX - lastPos.current.x) * 2.8;
        const dy = (touch.clientY - lastPos.current.y) * 2.8;
        
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          socket.emit('tv-move-cursor', { dx, dy });
        }
      }
      lastPos.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleEnd = () => { lastPos.current = null; };

    el.addEventListener('touchmove', handleMove, { passive: false });
    el.addEventListener('touchend', handleEnd);

    return () => {
      el.removeEventListener('touchmove', handleMove);
      el.removeEventListener('touchend', handleEnd);
    };
  }, [socket]);

  return (
    <div ref={trackpadRef} className="w-full h-full flex flex-col items-center justify-center cursor-none touch-none">
       <div className="w-20 h-20 border-2 border-blue-500/20 rounded-full flex items-center justify-center animate-pulse mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
       </div>
       <span className="text-slate-600 font-bold text-[10px] tracking-[0.4em] uppercase">Touch to Move</span>
    </div>
  );
}
