import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Remote() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Abhi ke liye empty, baad mein yahan Render ka URL aayega
    const s = io('https://your-server-url.com'); 
    setSocket(s);
    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));
    return () => s.close();
  }, []);

  const sendAction = (type, data) => {
    if (socket) socket.emit(type, data);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col p-6 font-sans select-none overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-blue-500 tracking-tighter">JEMBEE</h1>
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase">Cloud Remote</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${connected ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className={`text-[10px] font-bold ${connected ? 'text-green-500' : 'text-red-500'}`}>
            {connected ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Trackpad Area */}
      <div 
        className="flex-1 w-full bg-slate-900/40 rounded-[3rem] border-2 border-white/5 shadow-2xl flex items-center justify-center active:border-blue-500/30 transition-all touch-none"
        onTouchMove={(e) => {
          const touch = e.touches[0];
          sendAction('mouse-move', { x: touch.clientX, y: touch.clientY });
        }}
      >
        <div className="flex flex-col items-center opacity-20">
          <div className="w-12 h-12 border-2 border-slate-500 rounded-full mb-2 flex items-center justify-center">
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
          </div>
          <span className="text-[9px] font-bold tracking-[0.5em] uppercase">Trackpad</span>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-10 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => sendAction('mouse-click', 'left')}
            className="h-24 bg-slate-900/80 rounded-[2rem] border border-white/5 shadow-lg active:scale-95 active:bg-slate-800 transition-all font-bold text-slate-400"
          >
            LEFT
          </button>
          <button 
            onClick={() => sendAction('mouse-click', 'right')}
            className="h-24 bg-slate-900/80 rounded-[2rem] border border-white/5 shadow-lg active:scale-95 active:bg-slate-800 transition-all font-bold text-blue-500"
          >
            RIGHT
          </button>
        </div>

        <button 
          onClick={() => sendAction('keyboard-key', 'Enter')}
          className="w-full h-16 bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl font-black tracking-widest text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] active:scale-95 transition-all"
        >
          OK / ENTER
        </button>
      </div>

      <p className="text-center text-slate-700 text-[10px] mt-8 font-medium tracking-tighter">
        POWERED BY JEMBEE OS © 2026
      </p>
    </div>
  );
}
