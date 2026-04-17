import { useRef } from 'react';

export default function Trackpad({ socket }) {
  const lastPos = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const dx = touch.clientX - lastPos.current.x;
    const dy = touch.clientY - lastPos.current.y;
    socket.emit('mouse-move', { dx, dy });
    lastPos.current = { x: touch.clientX, y: touch.clientY };
  };

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
      onClick={() => socket.emit('mouse-click')}
      className="w-full h-96 bg-gray-800 rounded-3xl border-2 border-blue-500/50 flex items-center justify-center">
      <span className="text-blue-500/30 font-black text-4xl uppercase">Trackpad</span>
    </div>
  );
}
