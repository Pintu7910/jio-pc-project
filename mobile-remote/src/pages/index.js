import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Trackpad from '../components/Trackpad';

export default function Remote() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Yahan baad mein hum apna asli Server URL dalenge
    const s = io('https://aapka-server-url.com');
    setSocket(s);

    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));

    return () => s.close();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col p-6 font-sans select-none">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-blue-500 leading-none">JEMBEE</h1>
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em]">CLOUD REMOTE</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${connected ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className={`text-[10px] font-bold ${connected ? 'text-green-500' : 'text-red-500'}`}>
            {connected ? 'CONNECTED' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Trackpad Section */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-center text-slate-600 text-[10px] mb-4 tracking-widest uppercase">Glide to move cursor</p>
        <Trackpad socket={socket} />
      </div>

      {/* Buttons Section */}
      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => socket?.emit('mouse-click', 'left')}
            className="h-20 bg-slate-900 rounded-2xl border border-white/5 shadow-xl active:scale-95 active:bg-slate-800 transition-all font-bold text-slate-300"
          >
            LEFT CLICK
          </button>
          <button 
            onClick={() => socket?.emit('mouse-click', 'right')}
            className="h-20 bg-slate-900 rounded-2xl border border-white/5 shadow-xl active:scale-95 active:bg-slate-800 transition-all font-bold text-blue-500"
          >
            RIGHT CLICK
          </button>
        </div>

        <button 
          onClick={() => socket?.emit('keyboard-key', 'Enter')}
          className="w-full h-16 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black tracking-widest text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95 transition-all"
        >
          OK / ENTER
        </button>
      </div>

      <p className="text-center text-slate-700 text-[9px] mt-6 tracking-tight">
        Powered by Jembee OS © 2026
      </p>
    </div>
  );
}
