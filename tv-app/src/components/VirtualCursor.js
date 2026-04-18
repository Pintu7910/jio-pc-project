import { useEffect, useState } from 'react';

export default function VirtualCursor({ socket }) {
  const [pos, setPos] = useState({ x: 500, y: 300 });
  const [lastSignal, setLastSignal] = useState("No Signal");

  useEffect(() => {
    if (!socket) return;

    const moveCursor = (data) => {
      console.log("CURSOR MOVE:", data);

      setLastSignal(`DX:${data.dx.toFixed(1)} DY:${data.dy.toFixed(1)}`);

      setPos(p => ({
        x: Math.max(0, Math.min(window.innerWidth - 20, p.x + (data.dx || 0))),
        y: Math.max(0, Math.min(window.innerHeight - 20, p.y + (data.dy || 0)))
      }));
    };

    socket.on('tv-move-cursor', moveCursor);

    return () => {
      socket.off('tv-move-cursor', moveCursor);
    };
  }, [socket]);

  return (
    <>
      {/* DEBUG */}
      <div className="fixed bottom-20 right-4 bg-black text-green-400 text-xs p-2 rounded z-[10000]">
        {lastSignal}
      </div>

      {/* CURSOR */}
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="white" stroke="black">
          <path d="M3 3l7 17 2-7 7-2z" strokeWidth="2"/>
        </svg>
      </div>
    </>
  );
}
