import { useEffect, useState } from 'react';

export default function VirtualCursor({ socket }) {
  const [pos, setPos] = useState({ x: 500, y: 300 });
  const [lastSignal, setLastSignal] = useState("No Signal");

  useEffect(() => {
    if (!socket) return;

    const moveCursor = (data) => {
      setLastSignal(`Moving: ${data.dx.toFixed(1)}, ${data.dy.toFixed(1)}`);
      setPos(p => ({
        x: Math.max(0, Math.min(window.innerWidth - 20, p.x + (data.dx || 0) * 2.5)),
        y: Math.max(0, Math.min(window.innerHeight - 20, p.y + (data.dy || 0) * 2.5))
      }));
    };

    socket.on('tv-move-cursor', moveCursor);
    return () => socket.off('tv-move-cursor', moveCursor);
  }, [socket]);

  return (
    <>
      {/* Debug Box - Ise screen ke kone mein dekhein */}
      <div className="fixed bottom-20 right-4 bg-black/80 text-green-400 text-[10px] p-2 rounded border border-green-500/30 font-mono z-[10000]">
        LAST SIGNAL: {lastSignal}
      </div>

      <div style={{ 
          position: 'fixed', left: pos.x, top: pos.y, 
          zIndex: 9999, pointerEvents: 'none', transition: 'none' 
      }}>
        <svg width="25" height="25" viewBox="0 0 24 24" fill="white" stroke="black">
          <path d="M3 3l7 17 2-7 7-2z" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
    </>
  );
}
