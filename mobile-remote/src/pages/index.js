import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Trackpad from '../components/Trackpad';

export default function Remote() {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    // DEBUG: Console mein URL check karein
    console.log("Attempting to connect to: https://jio-pc-project.onrender.com");
    
    const s = io('https://jio-pc-project.onrender.com', {
      transports: ['websocket'],
      upgrade: false
    });

    setSocket(s);

    s.on('connect', () => {
      console.log("✅ DEBUG: Remote Connected! ID:", s.id);
      setStatus("ONLINE");
      // alert("Connected to Server!"); // Testing ke liye ise uncomment kar sakte hain
    });

    s.on('connect_error', (err) => {
      console.error("❌ DEBUG: Connection Error:", err.message);
      setStatus("ERROR: " + err.message);
    });

    return () => s.close();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Jembee Debug Remote</h1>
        <span className={`text-[10px] px-3 py-1 rounded-full ${status === 'ONLINE' ? 'bg-green-600' : 'bg-red-600'}`}>
          {status}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/10 rounded-3xl">
        {socket && status === "ONLINE" ? (
          <Trackpad socket={socket} />
        ) : (
          <div className="text-center text-slate-500 text-sm p-4">
            {status === "ONLINE" ? "Loading Trackpad..." : "Waiting for Server Connection..."}
          </div>
        )}
      </div>

      <div className="mt-6 text-[9px] text-slate-600 text-center font-mono">
        Device ID: {socket?.id || 'None'}
      </div>
    </div>
  );
}
