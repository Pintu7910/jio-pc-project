import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Trackpad from '../components/Trackpad';

export default function Remote() {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const s = io('https://jio-pc-project.onrender.com', { transports: ['websocket'] });
    setSocket(s);
    s.on('connect', () => setStatus("ONLINE"));
    s.on('connect_error', (err) => setStatus("ERROR: " + err.message));
    return () => s.close();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col p-4 overflow-hidden">
      <div className="mb-4">
        <h1 className="text-xl font-black text-blue-500">Jembee Remote</h1>
        <div className="text-[10px] opacity-60">STATUS: {status} | ID: {socket?.id}</div>
      </div>

      {/* 100% VISIBLE TRACKPAD AREA */}
      <div className="flex-1 w-full bg-slate-900/50 border-2 border-white/5 rounded-[2rem] relative overflow-hidden mb-4">
        {socket && status === "ONLINE" ? (
          <Trackpad socket={socket} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-700">Connecting...</div>
        )}
      </div>

      {/* CLICK BUTTONS */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button onTouchStart={() => socket?.emit('mouse-click', 'left')} className="h-16 bg-slate-800 rounded-2xl active:bg-blue-600 font-bold">LEFT</button>
        <button onTouchStart={() => socket?.emit('mouse-click', 'right')} className="h-16 bg-slate-800 rounded-2xl active:bg-blue-600 font-bold">RIGHT</button>
      </div>
    </div>
  );
}
