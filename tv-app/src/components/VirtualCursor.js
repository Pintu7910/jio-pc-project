import { useEffect, useState } from 'react';

export default function VirtualCursor({ socket }) {
  const [pos, setPos] = useState({ x: 500, y: 300 });

  useEffect(() => {
    if (!socket) return;

    const moveCursor = (data) => {
      setPos(p => ({
        // Multiplier ko 2.5 rakha hai speed ke liye
        x: Math.max(0, Math.min(window.innerWidth - 20, p.x + (data.dx || 0) * 2.5)),
        y: Math.max(0, Math.min(window.innerHeight - 20, p.y + (data.dy || 0) * 2.5))
      }));
    };

    const executeClick = () => {
      // Element dhoond kar click karna
      const el = document.elementFromPoint(pos.x, pos.y);
      if (el) el.click();
    };

    socket.on('tv-move-cursor', moveCursor);
    socket.on('tv-click-execute', executeClick);

    return () => {
      socket.off('tv-move-cursor', moveCursor);
      socket.off('tv-click-execute', executeClick);
    };
  }, [socket, pos]);

  return (
    <div style={{ 
        position: 'fixed', 
        left: pos.x, 
        top: pos.y, 
        zIndex: 9999, 
        pointerEvents: 'none', 
        transition: 'none' 
    }}>
      <svg width="25" height="25" viewBox="0 0 24 24" fill="white" stroke="black" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
        <path d="M3 3l7 17 2-7 7-2z" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
