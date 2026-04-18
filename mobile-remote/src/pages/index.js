import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Trackpad from '../components/Trackpad'; // Path check karein

export default function Remote() {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const s = io('https://jio-pc-project.onrender.com', {
      transports: ['websocket']
    });
    setSocket(s);

    s.on('connect', () => setStatus("ONLINE"));
    s.on('connect_error', (err) => setStatus("ERROR: " + err.message));

    return () => s.close();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-black text-blue-500 mb-2">Jembee Remote</h1>
      <div className="bg-slate-900 px-4 py-1 rounded-full text-[10px] mb-8 border border-white/10">
        STATUS: <span className={status === "ONLINE" ? "text-green-500" : "text-red-500"}>{status}</span>
      </div>

      <div className="w-full flex-1 flex items-center justify-center">
        {socket && status === "ONLINE" ? (
          <Trackpad socket={socket} />
        ) : (
          <div className="animate-pulse text-slate-600">Connecting to Cloud...</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-8">
        <button onTouchStart={() => socket.emit('mouse-click', 'left')} className="h-16 bg-slate-900 rounded-2xl border border-white/5 active:bg-blue-600">LEFT</button>
        <button onTouchStart={() => socket.emit('mouse-click', 'right')} className="h-16 bg-slate-900 rounded-2xl border border-white/5 active:bg-blue-600">RIGHT</button>
      </div>
      <p className="mt-4 text-[10px] text-slate-800">ID: {socket?.id}</p>
    </div>
  );
}
