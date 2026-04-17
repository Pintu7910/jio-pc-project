import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Remote() {
  const [status, setStatus] = useState('Connecting...');

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center p-6 font-sans">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-xl font-black tracking-tighter text-blue-400">JEMBEE <span className="text-white">REMOTE</span></h1>
        <div className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/50">
          <span className="text-[10px] text-green-400 font-bold">● LIVE</span>
        </div>
      </div>

      {/* Main Trackpad Area */}
      <div className="w-full aspect-square bg-slate-800/50 rounded-3xl border-2 border-white/10 shadow-2xl flex items-center justify-center relative active:bg-slate-700/50 transition-colors">
        <div className="text-slate-500 text-sm font-medium">TOUCH PAD AREA</div>
        {/* Iske andar hum baad mein finger movement ka logic dalenge */}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 gap-4 w-full mt-8">
        <button className="h-24 bg-slate-800 rounded-2xl border border-white/5 active:scale-95 transition-transform shadow-lg font-bold text-lg">LEFT</button>
        <button className="h-24 bg-slate-800 rounded-2xl border border-white/5 active:scale-95 transition-transform shadow-lg font-bold text-lg text-blue-400">RIGHT</button>
      </div>

      {/* Bottom Action */}
      <div className="w-full mt-6">
        <button className="w-full h-16 bg-blue-600 rounded-2xl font-black tracking-widest shadow-lg shadow-blue-500/20 active:bg-blue-700">
          OK / ENTER
        </button>
      </div>

      <p className="mt-10 text-slate-500 text-[10px] uppercase tracking-widest">Connected to Jio Cloud PC</p>
    </div>
  );
}
