import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Trackpad from '../components/Trackpad'; 

export default function Remote() {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    // Render URL fix
    const s = io('https://jio-pc-project.onrender.com', { transports: ['websocket'] });
    setSocket(s);
    s.on('connect', () => setStatus("ONLINE"));
    s.on('connect_error', (err) => setStatus("ERROR: " + err.message));
    return () => s.close();
  }, []);

  const sendClick = (type) => {
    if (socket) socket.emit('mouse-click', type);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col p-6 overflow-hidden">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-blue-500 italic tracking-tighter">Jembee Remote</h1>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
          {status} | ID: {socket?.id?.substring(0, 8)}
        </p>
      </div>

      {/* TRACKPAD CONTAINER - Ab ye 100% dikhega */}
      <div className="flex-1 w-full flex items-center justify-center bg-slate-900/40 rounded-[2.5rem] border-2 border-white/5 shadow-2xl overflow-hidden mb-6 relative">
        {socket && status === "ONLINE" ? (
          <Trackpad socket={socket} />
        ) : (
          <div className="text-slate-700 animate-pulse font-bold">WAKING UP SERVER...</div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="grid grid-cols-2 gap-4">
        <button onTouchStart={() => sendClick('left')} className="h-20 bg-slate-900 rounded-3xl border border-white/10 active:bg-blue-600 font-black shadow-lg">LEFT</button>
        <button onTouchStart={() => sendClick('right')} className="h-20 bg-slate-900 rounded-3xl border border-white/10 active:bg-blue-600 font-black shadow-lg">RIGHT</button>
      </div>
      
      <p className="text-center text-slate-800 text-[10px] mt-6 font-bold uppercase tracking-widest">Powered by Jembee OS © 2026</p>
    </div>
  );
}
