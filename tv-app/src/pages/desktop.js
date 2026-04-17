import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import VirtualCursor from '../components/VirtualCursor';

export default function Desktop() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Isse apne local IP se badlein baad mein
    const s = io('http://localhost:3001'); 
    setSocket(s);
    return () => s.close();
  }, []);

  return (
    <div className="w-screen h-screen bg-blue-900 relative overflow-hidden flex flex-col" 
         style={{backgroundImage: 'linear-gradient(to right, #1e3a8a, #3b82f6)'}}>
      <div className="flex-1 p-10 flex flex-wrap gap-10">
        <div className="w-24 h-24 bg-white/10 rounded-lg flex flex-col items-center justify-center text-white border border-white/20">
          <div className="w-10 h-10 bg-blue-500 rounded mb-2"></div>
          <span className="text-xs">Jembee PC</span>
        </div>
      </div>
      <div className="h-12 bg-black/80 w-full flex items-center px-4 border-t border-white/10">
        <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm font-bold">Start</button>
      </div>
      <VirtualCursor socket={socket} />
    </div>
  );
}
