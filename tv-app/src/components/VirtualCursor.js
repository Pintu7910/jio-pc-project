import { useEffect, useState } from 'react';

export default function VirtualCursor({ socket }) {
  const [pos, setPos] = useState({ x: 500, y: 300 });

  useEffect(() => {
    if (!socket) return;
    socket.on('tv-move-cursor', (data) => {
      setPos(p => ({
        x: Math.max(0, Math.min(window.innerWidth - 20, p.x + data.dx * 2.5)),
        y: Math.max(0, Math.min(window.innerHeight - 20, p.y + data.dy * 2.5))
      }));
    });
    socket.on('tv-click-execute', () => {
      const el = document.elementFromPoint(pos.x, pos.y);
      if (el) el.click();
    });
  }, [socket, pos]);

  return (
    <div style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999, pointerEvents: 'none' }}>
      <svg width="25" height="25" viewBox="0 0 24 24" fill="white" stroke="black">
        <path d="M3 3l7 17 2-7 7-2z"/>
      </svg>
    </div>
  );
}
