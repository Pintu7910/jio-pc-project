import { useEffect, useState } from 'react';

export default function VirtualCursor({ socket }) {
  const [pos, setPos] = useState({ x: 500, y: 300 });

  useEffect(() => {
    if (!socket) return;

    // Mobile se aane wale signal ka naam 'pc-move' rakhein (standard)
    const handleMove = (data) => {
      setPos(p => ({
        x: Math.max(0, Math.min(window.innerWidth - 20, p.x + data.dx * 2.5)),
        y: Math.max(0, Math.min(window.innerHeight - 20, p.y + data.dy * 2.5))
      }));
    };

    const handleClick = () => {
      const el = document.elementFromPoint(pos.x, pos.y);
      if (el) el.click();
    };

    // Dono common event names check kar lete hain
    socket.on('pc-move', handleMove);
    socket.on('tv-move-cursor', handleMove); // Aapka purana event name
    socket.on('tv-click-execute', handleClick);

    return () => {
      socket.off('pc-move', handleMove);
      socket.off('tv-move-cursor', handleMove);
      socket.off('tv-click-execute', handleClick);
    };
  }, [socket, pos]);

  return (
    <div style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999, pointerEvents: 'none', transition: 'none' }}>
      <svg width="25" height="25" viewBox="0 0 24 24" fill="white" stroke="black" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
        <path d="M3 3l7 17 2-7 7-2z"/>
      </svg>
    </div>
  );
}
