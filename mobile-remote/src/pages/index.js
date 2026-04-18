import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Trackpad from '../components/Trackpad';

export default function Remote() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Render URL check karlein: https://jio-pc-project.onrender.com
    const s = io('https://jio-pc-project.onrender.com');
    setSocket(s);

    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));

    return () => s.close();
  }, []);

  const sendAction = (type, data) => {
    if (socket) socket.emit(type, data);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col p-6 font-sans">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-blue-500 tracking-tighter">Jembee Remote</h1>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80`}>
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-[10px] font-bold uppercase">{connected ? 'ONLINE' : 'OFFLINE'}</span>
        </div>
      </div>

      {/* Trackpad Component - Ye ab signal sahi bhejega */}
      <div className="flex-1 w-full mb-8">
        <Trackpad socket={socket} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <button onClick={() => sendAction('mouse-click', 'left')} className="h-20 bg-slate-900/80 rounded-[2rem] border border-white/5 active:bg-blue-600 font-bold uppercase text-xs">Left Click</button>
        <button onClick={() => sendAction('mouse-click', 'right')} className="h-20 bg-slate-900/80 rounded-[2rem] border border-white/5 active:bg-blue-600 font-bold uppercase text-xs">Right Click</button>
      </div>

      <button onClick={() => sendAction('keyboard-type', 'Enter')} className="w-full h-16 bg-gradient-to-r from-blue-700 to-blue-600 rounded-[1.5rem] font-bold shadow-lg active:scale-95 transition-transform">
        OK / ENTER
      </button>

      <p className="text-center text-slate-700 text-[10px] mt-8 font-medium uppercase tracking-[0.2em]">
        POWERED BY JEMBEE OS © 2026
      </p>
    </div>
  );
}
