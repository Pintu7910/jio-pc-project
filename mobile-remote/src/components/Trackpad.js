import React, { useRef, useEffect } from 'react';

export default function Trackpad({ socket }) {
  const trackpadRef = useRef(null);
  const lastPos = useRef(null);

  useEffect(() => {
    const el = trackpadRef.current;
    if (!el) return;

    // 👉 TOUCH START (fix jump issue)
    const handleStart = (e) => {
      const touch = e.touches[0];
      lastPos.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    // 👉 TOUCH MOVE
    const handleMove = (e) => {
      if (e.cancelable) e.preventDefault();

      const touch = e.touches[0];
      if (!lastPos.current) return;

      const dx = (touch.clientX - lastPos.current.x) * 2.5;
      const dy = (touch.clientY - lastPos.current.y) * 2.5;

      // Debug
      console.log("MOVE:", dx, dy);

      socket.emit('move', { dx, dy }); // 🔥 unified event name

      lastPos.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    // 👉 TOUCH END
    const handleEnd = () => {
      lastPos.current = null;
    };

    // 👉 TAP = CLICK
    const handleTap = () => {
      console.log("CLICK");
      socket.emit('click');
    };

    el.addEventListener('touchstart', handleStart, { passive: false });
    el.addEventListener('touchmove', handleMove, { passive: false });
    el.addEventListener('touchend', handleEnd);
    el.addEventListener('click', handleTap);

    return () => {
      el.removeEventListener('touchstart', handleStart);
      el.removeEventListener('touchmove', handleMove);
      el.removeEventListener('touchend', handleEnd);
      el.removeEventListener('click', handleTap);
    };
  }, [socket]);

  return (
    <div
      ref={trackpadRef}
      className="w-full h-full flex flex-col items-center justify-center cursor-none touch-none select-none"
      style={{
        touchAction: "none",
        background: "black"
      }}
    >
      {/* UI */}
      <div className="w-24 h-24 border border-blue-500/30 rounded-full flex items-center justify-center animate-pulse mb-4">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
      </div>

      <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">
        Touchpad Active
      </span>
    </div>
  );
}
