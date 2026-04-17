import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Ye turant desktop page par bhej dega
    router.push('/desktop');
  }, [router]);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <h1 className="text-white text-2xl font-bold animate-pulse">Jio PC Starting...</h1>
    </div>
  );
}
