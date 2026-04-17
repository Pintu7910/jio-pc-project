import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Trackpad from '../components/Trackpad';

export default function Remote() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);
    return () => s.close();
  }, []);

  if (!socket) return <div className="text-white p-10">Connecting...</div>;

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center justify-center gap-10">
      <h1 className="text-blue-500 font-bold text-xl tracking-tighter">JIO CLOUD PC REMOTE</h1>
      <Trackpad socket={socket} />
      <button onClick={() => socket.emit('keyboard-type', 'Enter')} 
        className="w-full bg-blue-600 py-4 rounded-xl text-white font-bold shadow-lg">ENTER</button>
    </div>
  );
}
