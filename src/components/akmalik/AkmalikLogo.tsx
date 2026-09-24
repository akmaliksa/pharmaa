import React from 'react';

interface AkmalikLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
}

export const AkmalikLogo: React.FC<AkmalikLogoProps> = ({
  className = '',
  size = 'md',
  inverted = false,
}) => {
  const letters = ['A', 'K', 'M', 'A', 'L', 'I', 'K'];

  const textColor = inverted ? 'text-[#FFFDF7]' : 'text-[#09543D]';
  const dotColor = inverted ? 'bg-[#FFA9E9]' : 'bg-[#09543D]';
  const crossColor = inverted ? 'bg-[#FFA9E9] text-[#09543D]' : 'bg-[#09543D] text-[#FFFDF7]';

  const sizeClasses = {
    sm: 'text-lg tracking-[0.18em]',
    md: 'text-2xl tracking-[0.2em]',
    lg: 'text-4xl tracking-[0.24em]',
    xl: 'text-6xl sm:text-7xl md:text-8xl tracking-[0.28em]',
  }[size];

  const dotSize = {
    sm: 'w-1 h-1 mb-0.5',
    md: 'w-1.5 h-1.5 mb-1',
    lg: 'w-2 h-2 mb-1.5',
    xl: 'w-3 h-3 md:w-4 md:h-4 mb-2 md:mb-3',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 select-none group font-sans ${className}`}>
      {/* Brand Name with Dots Above Each Letter */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {letters.map((char, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {/* The signature playful dot */}
            <span
              className={`${dotSize} rounded-full ${dotColor} transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-0.5`}
              style={{ transitionDelay: `${idx * 40}ms` }}
            />
            {/* Bold Character */}
            <span
              className={`font-black font-sans leading-none ${sizeClasses} ${textColor} transition-colors`}
            >
              {char}
            </span>
          </div>
        ))}
      </div>

      {/* Pharmacy Green Cross Accent Dot Badge */}
      <div
        className={`shrink-0 rounded-full flex items-center justify-center font-bold ${crossColor} ${
          size === 'sm'
            ? 'w-4 h-4 text-[9px]'
            : size === 'md'
            ? 'w-5 h-5 text-[10px]'
            : size === 'lg'
            ? 'w-7 h-7 text-xs'
            : 'w-10 h-10 md:w-12 md:h-12 text-base md:text-lg'
        }`}
        title="Pharmacy Brokerage"
      >
        <span>+</span>
      </div>
    </div>
  );
};
