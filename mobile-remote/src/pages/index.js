import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Remote() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Yahan hum apna server URL dalenge jab wo live ho jayega
    const s = io('https://your-server-url.com'); 
    setSocket(s);
    s.on('connect', () => setConnected(true));
    s.on('disconnect', () => setConnected(false));
    return () => s.close();
  }, []);

  const emitAction = (event, data) => {
    if (socket) socket.emit(event, data);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col p-6 font-sans select-none overflow-hidden">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-blue-500 tracking-tighter">JEMBEE</h1>
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em]">CLOUD REMOTE</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${connected ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-[10px] font-bold">{connected ? 'ONLINE' : 'OFFLINE'}</span>
        </div>
      </div>

      {/* Trackpad - Central Area */}
      <div 
        className="flex-1 w-full bg-slate-900/50 rounded-[2.5rem] border-2 border-white/5 shadow-inner flex items-center justify-center relative active:border-blue-500/40 transition-all touch-none"
        onTouchMove={(e) => {
          const touch = e.touches[0];
          emitAction('mouse-move', { x: touch.clientX, y: touch.clientY });
        }}
      >
        <span className="text-slate-700 font-bold text-[10px] uppercase tracking-[0.3em]">Trackpad Area</span>
      </div>

      {/* Control Buttons */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <button 
          onClick={() => emitAction('mouse-click', 'left')}
          className="h-24 bg-slate-900 rounded-3xl border border-white/5 shadow-xl active:scale-95 active:bg-slate-800 transition-all font-bold text-slate-400"
        >
          LEFT CLICK
        </button>
        <button 
          onClick={() => emitAction('mouse-click', 'right')}
          className="h-24 bg-slate-900 rounded-3xl border border-white/5 shadow-xl active:scale-95 active:bg-slate-800 transition-all font-bold text-blue-500"
        >
          RIGHT CLICK
        </button>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => emitAction('keyboard-key', 'Enter')}
        className="mt-4 w-full h-16 bg-blue-600 rounded-2xl font-black tracking-widest text-white shadow-lg active:scale-95 transition-all"
      >
        OK / ENTER
      </button>

      <p className="text-center text-slate-700 text-[9px] mt-6 tracking-widest">POWERED BY JEMBEE OS</p>
    </div>
  );
}
