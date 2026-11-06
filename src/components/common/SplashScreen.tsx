import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(0.96);

  useEffect(() => {
    // Subtle zoom-in entrance
    const scaleTimer = setTimeout(() => {
      setScale(1);
    }, 50);

    // Fade out and finish
    const exitTimer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onFinish, 600);
    }, 2200);

    return () => {
      clearTimeout(scaleTimer);
      clearTimeout(exitTimer);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        opacity,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] px-6 select-none overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#D7AD55]/10 blur-[120px] pointer-events-none" />

      <div
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Authentic Brand Emblem */}
        <div className="relative mb-6 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#D7AD55]/15 blur-xl animate-pulse" />
          <img
            src="/brand-emblem.svg"
            alt="عالم الجمال"
            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(215,173,85,0.45)]"
          />
        </div>

        {/* Brand Wordmark */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4EAD5] mb-1 font-serif">
          عالم الجمال
        </h1>
        <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#D7AD55] uppercase mb-4">
          ALAM ALJAMAL · MAISON DE BEAUTÉ
        </p>

        <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#F4EAD5]/60 mt-4">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D7AD55]/60" />
          <span className="text-[#D7AD55] text-xs">✦</span>
          <span className="tracking-wider">فخامة بلا حدود</span>
          <span className="text-[#D7AD55] text-xs">✦</span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D7AD55]/60" />
        </div>
      </div>

      <button
        onClick={() => {
          setOpacity(0);
          setTimeout(onFinish, 300);
        }}
        className="absolute bottom-10 text-xs text-[#D7AD55]/80 hover:text-[#F4D98E] transition-colors py-2 px-4 rounded-full border border-[#D7AD55]/20 backdrop-blur-md"
      >
        تخطي المقدمة ←
      </button>
    </div>
  );
};
