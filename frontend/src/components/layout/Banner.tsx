import { Sparkles, Triangle } from "lucide-react";

const Banner = () => {
  const content = (
    <div className="marquee-content py-2">
      <div className="flex items-center gap-4">
        <Triangle size={12} className="fill-white text-white rotate-90" />
        <span className="text-[11px] font-black uppercase tracking-widest text-white">PIÈCES UNIQUES SEULEMENT</span>
      </div>
      <div className="flex items-center gap-4">
        <Triangle size={12} className="fill-white text-white rotate-90" />
        <span className="text-[11px] font-black uppercase tracking-widest text-white">PAS DE RÉASSORT</span>
      </div>
      <div className="flex items-center gap-4">
        <Triangle size={12} className="fill-white text-white rotate-90" />
        <span className="text-[11px] font-black uppercase tracking-widest text-white">PAIEMENT À LA LIVRAISON</span>
      </div>
      <div className="flex items-center gap-4">
        <Triangle size={12} className="fill-white text-white rotate-90" />
        <span className="text-[11px] font-black uppercase tracking-widest text-white">PIÈCES UNIQUES SEULEMENT</span>
      </div>
      <div className="flex items-center gap-4">
        <Triangle size={12} className="fill-white text-white rotate-90" />
        <span className="text-[11px] font-black uppercase tracking-widest text-white">PAS DE RÉASSORT</span>
      </div>
    </div>
  );

  return (
    <div className="bg-secondary text-white overflow-hidden whitespace-nowrap marquee border-b border-black/5">
      {content}
      {content}
    </div>
  );
};

export default Banner;
