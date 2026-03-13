import { useState, useEffect } from 'react';
import { Drop } from '@/types';
import { motion } from 'framer-motion';

interface DropCountdownProps {
  drop: Drop;
}

const DropCountdown = ({ drop }: DropCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(drop.launch_date).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      return { days: d, hours: h, minutes: m, seconds: s };
    };
    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(interval);
  }, [drop.launch_date]);

  const blocks = [
    { label: 'Jours', value: timeLeft.days },
    { label: 'Heures', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Secondes', value: timeLeft.seconds },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center"
    >
      <div className="bg-[#1A1A1A] text-white p-12 md:p-16 rounded-[48px] shadow-2xl relative overflow-hidden group">
        {/* Animated background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity duration-700" />
        
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-secondary font-black text-[11px] uppercase tracking-[0.4em] mb-4">Prochain Drop</p>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-10 text-center tracking-tighter">
            {new Date(drop.launch_date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </h2>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {blocks.map((b, i) => (
              <div key={b.label} className="flex flex-col items-center">
                <div className="relative">
                  <span className="font-display text-5xl md:text-7xl font-black tracking-tighter tabular-nums">
                    {String(b.value).padStart(2, '0')}
                  </span>
                  {i < blocks.length - 1 && (
                    <span className="absolute -right-4 md:-right-8 top-0 text-white/20 text-4xl md:text-6xl font-light hidden sm:block">:</span>
                  )}
                </div>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] mt-3 text-white/40">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DropCountdown;
