import React from 'react';

interface CognoraLogoProps {
  /** Size variant: 'xs' (22px), 'sm' (28px), 'md' (36px), 'lg' (44px), 'xl' (54px) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showSubtitle?: boolean;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  theme?: 'light' | 'dark' | 'auto';
}

/**
 * Cognora Official Mark (Vector representation of the brand mark):
 * 1. Folded dimensional "C" ribbon (violet/indigo to sky blue).
 * 2. Open fluttering book pages at the base of the "C".
 * 3. 4-node neural synaptic constellation at the core.
 * 4. Squircle container with theme-tailored background & border:
 *    - Day: Crisp elevated light surface (#FFFFFF / #EEF2FF) with delicate violet border (#C7D2FE)
 *    - Night: Deep charcoal/navy container (#131318 / #090A12) with luminous violet/cyan border
 */
export const CognoraMark: React.FC<{
  size?: number;
  className?: string;
  glow?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}> = ({ size = 36, className = '', glow = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Cognora Logo"
    >
      <defs>
        {/* Night Border gradient: Violet to Cyan/Blue */}
        <linearGradient
          id="cgBorderNight"
          x1="10"
          y1="10"
          x2="90"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="35%" stopColor="#A855F7" />
          <stop offset="70%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>

        {/* Day Border gradient: Subtle elegant violet/indigo */}
        <linearGradient
          id="cgBorderDay"
          x1="10"
          y1="10"
          x2="90"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>

        {/* Night Squircle interior: Deep charcoal/navy */}
        <linearGradient
          id="cgBgNight"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#14141D" />
          <stop offset="100%" stopColor="#0B0B12" />
        </linearGradient>

        {/* Day Squircle interior: Crisp elevated white with slight violet undertone */}
        <linearGradient
          id="cgBgDay"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F7FF" />
        </linearGradient>

        {/* Left ribbon fold: Lavender -> Rich Violet -> Royal Indigo */}
        <linearGradient
          id="cgLeftRibbonLive"
          x1="20"
          y1="18"
          x2="45"
          y2="78"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="22%" stopColor="#A78BFA" />
          <stop offset="55%" stopColor="#6366F1" />
          <stop offset="85%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#3730A3" />
        </linearGradient>

        {/* Top ribbon crest: Electric Cyan to Sky Blue */}
        <linearGradient
          id="cgTopCrestLive"
          x1="38"
          y1="16"
          x2="76"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="40%" stopColor="#60A5FA" />
          <stop offset="75%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>

        {/* Inner shadow fold of the C */}
        <linearGradient
          id="cgInnerShadowLive"
          x1="24"
          y1="24"
          x2="50"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#312E81" />
          <stop offset="100%" stopColor="#4338CA" />
        </linearGradient>

        {/* Upper fluttering book page */}
        <linearGradient
          id="cgPageTopLive"
          x1="36"
          y1="76"
          x2="82"
          y2="54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#60A5FA" />
          <stop offset="85%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>

        {/* Under/Lower book page */}
        <linearGradient
          id="cgPageUnderLive"
          x1="36"
          y1="80"
          x2="76"
          y2="68"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        {/* Node glow filter */}
        <filter id="cgGlowLive" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Squircle Container: Day Version */}
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="26"
        fill="url(#cgBgDay)"
        stroke="url(#cgBorderDay)"
        strokeWidth="2.2"
        className="dark:hidden transition-opacity duration-200"
      />

      {/* Squircle Container: Night Version */}
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="26"
        fill="url(#cgBgNight)"
        stroke="url(#cgBorderNight)"
        strokeWidth="2.4"
        className="hidden dark:block transition-opacity duration-200"
      />

      {/* Subtle top edge luminous sheen (Night only) */}
      <path
        d="M 28 4 Q 50 2 72 4"
        stroke="#818CF8"
        strokeWidth="1"
        opacity="0.4"
        strokeLinecap="round"
        className="hidden dark:block"
      />

      {/* Inner deep shadow fold of the C */}
      <path
        d="M 44 20 C 32 24 23 36 23 50 C 23 62 29 72 38 78 C 31 70 27 58 27 48 C 27 36 34 26 44 20 Z"
        fill="url(#cgInnerShadowLive)"
        className="opacity-90 dark:opacity-100"
      />

      {/* Left Dimensional Ribbon (Violet to Royal Indigo) */}
      <path
        d="M 48 16 C 30 16 18 30 18 48 C 18 64 26 74 36 78 C 32 70 24 60 24 48 C 24 34 32 23 48 17.5 Z"
        fill="url(#cgLeftRibbonLive)"
      />

      {/* Top Ribbon Arch & Crest (Violet to Electric Cyan) */}
      <path
        d="M 44 16 C 56 16 68 20 76 28 C 72 33 63 38 57 37 C 49 30 42 23 35 18 C 38 16.8 41 16 44 16 Z"
        fill="url(#cgTopCrestLive)"
      />
      <path
        d="M 42 16.5 C 50 17 62 20 74 27 C 76 28.5 75 30 73 31 C 66 35 58 37 54 36 C 46 29 40 23 35 18.5 Z"
        fill="#60A5FA"
        opacity="0.7"
      />

      {/* Book Pages at base of C */}
      {/* Lower Page */}
      <path
        d="M 36 78 C 48 76 62 72 74 68 C 76 70 75 73 72 74.5 C 60 77.5 48 80.5 36 78 Z"
        fill="url(#cgPageUnderLive)"
      />
      {/* Top Fluttering Page */}
      <path
        d="M 36 76 C 46 68 60 62 78 56 C 81 58 79.5 61 76 63.5 C 62 67 48 72 36 76 Z"
        fill="url(#cgPageTopLive)"
      />
      {/* Page tip notched curl detail */}
      <path d="M 78 56 L 82.5 59 L 76 63.5 Z" fill="#7DD3FC" />

      {/* Neural Constellation (4 Synaptic Connected Nodes) */}
      <g filter={glow ? 'url(#cgGlowLive)' : undefined}>
        <path
          d="M 60 39 L 71 44 L 63 54 L 52 48 Z"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinejoin="round"
          opacity="0.95"
          fill="none"
        />
        <path
          d="M 52 48 L 71 44"
          stroke="#60A5FA"
          strokeWidth="1.1"
          opacity="0.7"
          fill="none"
        />
      </g>

      {/* Constellation Nodes */}
      <circle cx="60" cy="39" r="3.4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />
      <circle cx="71" cy="44" r="3.4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />
      <circle cx="63" cy="54" r="3.4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />
      <circle cx="52" cy="48" r="3.4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />

      {/* Bright Core Centers of Nodes */}
      <circle cx="60" cy="39" r="1.4" fill="#FFFFFF" />
      <circle cx="71" cy="44" r="1.4" fill="#FFFFFF" />
      <circle cx="63" cy="54" r="1.4" fill="#FFFFFF" />
      <circle cx="52" cy="48" r="1.4" fill="#FFFFFF" />
    </svg>
  );
};

export const CognoraLogo: React.FC<CognoraLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showSubtitle = true,
  subtitle = 'AI Study Assistant',
  className = '',
  onClick,
  theme
}) => {
  // Dimensions based on size preset
  const dim = {
    xs: { iconSize: 24, title: 'text-sm', sub: 'text-[9px]' },
    sm: { iconSize: 30, title: 'text-base', sub: 'text-[10px]' },
    md: { iconSize: 38, title: 'text-lg', sub: 'text-[11px]' },
    lg: { iconSize: 46, title: 'text-xl', sub: 'text-xs' },
    xl: { iconSize: 58, title: 'text-2xl', sub: 'text-sm' }
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Container with smooth hover micro-interaction */}
      <div className="relative shrink-0 group-hover:scale-[1.04] transition-all duration-200 drop-shadow-xs dark:group-hover:drop-shadow-[0_0_14px_rgba(99,102,241,0.4)]">
        <CognoraMark size={dim.iconSize} glow={true} theme={theme} />
      </div>

      {/* Wordmark & Subtitle */}
      {showWordmark && (
        <div className="flex flex-col justify-center min-w-0">
          <span
            className={`font-heading font-extrabold tracking-tight text-[#111827] dark:text-[#F5F5F7] group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-200 leading-tight ${dim.title}`}
          >
            Cognora
          </span>

          {showSubtitle && (
            <span
              className={`font-sans font-medium tracking-normal text-indigo-600 dark:text-[#A8A8B3] truncate leading-tight mt-0.5 ${dim.sub}`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
