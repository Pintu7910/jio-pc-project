import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 2 second ka delay taaki "Starting" animation dikhe, phir desktop par bhej dega
    const timer = setTimeout(() => {
      router.push('/desktop');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen bg-[#020617] flex flex-col items-center justify-center font-sans">
      {/* Loading Animation */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
        </div>
      </div>

      <h1 className="text-blue-500 text-3xl font-black tracking-tighter animate-pulse">
        JEMBEE OS
      </h1>
      <p className="text-slate-500 text-[10px] font-bold tracking-[0.5em] mt-2 uppercase">
        Starting Cloud Session...
      </p>

      {/* Footer Info */}
      <div className="absolute bottom-10 text-slate-700 text-[10px] font-medium">
        POWERED BY JEMBEE KART © 2026
      </div>
    </div>
  );
}
