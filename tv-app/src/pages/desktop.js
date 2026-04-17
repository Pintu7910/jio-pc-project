import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import VirtualCursor from '../components/VirtualCursor';

export default function Desktop() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Aapka Live Render Server URL
    const s = io('https://jio-pc-project.onrender.com'); 
    setSocket(s);

    // Connection check karne ke liye logs
    s.on('connect', () => {
      console.log("Cloud Desktop connected to Server!");
    });

    return () => s.close();
  }, []);

  return (
    <div className="w-screen h-screen bg-blue-900 relative overflow-hidden flex flex-col" 
         style={{backgroundImage: 'linear-gradient(to right, #1e3a8a, #3b82f6)'}}>
      
      {/* Desktop Icons Area */}
      <div className="flex-1 p-10 flex flex-wrap gap-10">
        <div className="w-24 h-24 bg-white/10 rounded-lg flex flex-col items-center justify-center text-white border border-white/20 active:scale-95 transition-all">
          <div className="w-10 h-10 bg-blue-500 rounded mb-2 shadow-lg shadow-blue-500/50"></div>
          <span className="text-xs font-medium uppercase tracking-tighter">Jembee PC</span>
        </div>
        
        {/* Aap yahan aur icons bhi add kar sakti hain */}
      </div>

      {/* Taskbar */}
      <div className="h-12 bg-black/80 w-full flex items-center px-4 border-t border-white/10 backdrop-blur-md">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded text-sm font-black tracking-widest shadow-lg shadow-blue-600/20 active:scale-90 transition-all">
          START
        </button>
        <div className="ml-auto text-white/50 text-[10px] font-bold">
          JEMBEE OS v1.0
        </div>
      </div>

      {/* Ye component mobile se aane wale signals ko receive karke cursor move karega */}
      {socket && <VirtualCursor socket={socket} />}
    </div>
  );
}
