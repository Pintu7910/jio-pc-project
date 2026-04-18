import React, { useRef, useEffect } from 'react';

export default function Trackpad({ socket }) {
  const trackpadRef = useRef(null);
  const lastTouch = useRef(null); // State ki jagah useRef use kar rahe hain fast performance ke liye

  useEffect(() => {
    const el = trackpadRef.current;
    if (!el) return;

    const handleMove = (e) => {
      // 1. Forcefully browser scroll aur gestures ko rokna
      if (e.cancelable) e.preventDefault();

      if (!socket || !e.touches[0]) return;

      const touch = e.touches[0];

      if (lastTouch.current) {
        // 2. Movement calculation with Sensitivity (2.5x)
        const dx = (touch.clientX - lastTouch.current.x) * 2.5;
        const dy = (touch.clientY - lastTouch.current.y) * 2.5;

        // 3. Significant movement check
        if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
          socket.emit('tv-move-cursor', { dx, dy });
        }
      }

      lastTouch.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleEnd = () => {
      lastTouch.current = null;
    };

    // 4. Sabse Important: { passive: false } browser ko scroll karne se rokta hai
    el.addEventListener("touchmove", handleMove, { passive: false });
    el.addEventListener("touchend", handleEnd);

    return () => {
      el.removeEventListener("touchmove", handleMove);
      el.removeEventListener("touchend", handleEnd);
    };
  }, [socket]);

  return (
    <div 
      ref={trackpadRef}
      style={{
        touchAction: 'none', // CSS level par scroll rokna
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
      className="w-full aspect-square bg-gradient-to-br from-slate-900 to-black rounded-[2.5rem] border-4 border-white/10 flex items-center justify-center relative shadow-2xl active:border-blue-500/50 transition-all"
    >
      <div className="absolute inset-4 border border-white/5 rounded-[2rem] pointer-events-none"></div>
      <div className="text-slate-500 font-bold text-[10px] tracking-widest uppercase opacity-40 text-center">
        Precision <br/> Trackpad
      </div>
    </div>
  );
}
