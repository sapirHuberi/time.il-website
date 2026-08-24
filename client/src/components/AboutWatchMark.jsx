/**
 * Decorative watch + strap mark.
 * Default orientation is vertical (About). Pass orientation="horizontal" for Straps.
 * Minute hand follows scroll when handRotation is provided; second hand and stitching animate.
 */
export default function AboutWatchMark({ handRotation = 0, orientation = 'vertical' }) {
  const hourMarks = Array.from({ length: 12 }, (_, i) => i * 30);
  const minuteTicks = Array.from({ length: 60 }, (_, i) => i);
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={
        isHorizontal
          ? 'relative mx-auto flex h-36 w-52 shrink-0 items-center justify-center motion-safe:animate-watch-float md:h-40 md:w-56'
          : 'relative flex h-52 w-36 shrink-0 items-center justify-center motion-safe:animate-watch-float md:h-56 md:w-40'
      }
      aria-hidden="true"
    >
      <div
        className={
          isHorizontal
            ? 'flex h-52 w-36 shrink-0 items-center justify-center rotate-90 md:h-56 md:w-40'
            : 'h-full w-full'
        }
      >
      <svg
        viewBox="0 0 160 220"
        className="h-full w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top strap */}
        <g
          className="motion-safe:animate-strap-sway"
          style={{ transformOrigin: '80px 48px', transformBox: 'view-box' }}
        >
          <path
            d="M58 8c0-3 4-6 22-6s22 3 22 6v40c0 4-6 8-22 8s-22-4-22-8V8Z"
            fill="#8B5A2B"
            fillOpacity="0.9"
          />
          <path
            d="M58 8c0-3 4-6 22-6s22 3 22 6v40c0 4-6 8-22 8s-22-4-22-8V8Z"
            stroke="#D4AF37"
            strokeOpacity="0.5"
            strokeWidth="1.25"
          />
          <path
            d="M66 10v36M94 10v36"
            stroke="#D4AF37"
            strokeOpacity="0.6"
            strokeWidth="1"
            strokeDasharray="3 5"
            strokeLinecap="round"
            className="motion-safe:animate-stitch-run"
          />
          <rect x="74" y="18" width="12" height="6" rx="1.5" fill="#0A192F" fillOpacity="0.35" />
          <rect x="74" y="32" width="12" height="6" rx="1.5" fill="#0A192F" fillOpacity="0.35" />
        </g>

        {/* Bottom strap */}
        <g
          className="motion-safe:animate-strap-sway-rev"
          style={{ transformOrigin: '80px 172px', transformBox: 'view-box' }}
        >
          <path
            d="M58 172c0-4 6-8 22-8s22 4 22 8v40c0 3-4 6-22 6s-22-3-22-6v-40Z"
            fill="#8B5A2B"
            fillOpacity="0.9"
          />
          <path
            d="M58 172c0-4 6-8 22-8s22 4 22 8v40c0 3-4 6-22 6s-22-3-22-6v-40Z"
            stroke="#D4AF37"
            strokeOpacity="0.5"
            strokeWidth="1.25"
          />
          <path
            d="M66 174v36M94 174v36"
            stroke="#D4AF37"
            strokeOpacity="0.6"
            strokeWidth="1"
            strokeDasharray="3 5"
            strokeLinecap="round"
            className="motion-safe:animate-stitch-run"
          />
          <rect x="74" y="182" width="12" height="6" rx="1.5" fill="#0A192F" fillOpacity="0.35" />
          <rect x="74" y="196" width="12" height="6" rx="1.5" fill="#0A192F" fillOpacity="0.35" />
        </g>

        {/* Lugs */}
        <rect x="52" y="68" width="10" height="14" rx="2" fill="#0A192F" fillOpacity="0.8" />
        <rect x="98" y="68" width="10" height="14" rx="2" fill="#0A192F" fillOpacity="0.8" />
        <rect x="52" y="138" width="10" height="14" rx="2" fill="#0A192F" fillOpacity="0.8" />
        <rect x="98" y="138" width="10" height="14" rx="2" fill="#0A192F" fillOpacity="0.8" />

        {/* Case */}
        <circle cx="80" cy="110" r="48" fill="#F8FAFC" stroke="#D4AF37" strokeWidth="3.5" />
        <circle cx="80" cy="110" r="42" stroke="#C5A880" strokeWidth="1" strokeOpacity="0.75" />

        {/* Crown */}
        <g
          className="motion-safe:animate-crown-pulse"
          style={{ transformOrigin: '130px 110px', transformBox: 'view-box' }}
        >
          <rect x="126" y="102" width="8" height="16" rx="2" fill="#D4AF37" fillOpacity="0.9" />
          <rect x="132" y="105" width="4" height="10" rx="1" fill="#0A192F" fillOpacity="0.4" />
        </g>

        {/* Minute track — slow spin (replaces dashed ring) */}
        <g
          className="motion-safe:animate-spin-slow"
          style={{ transformOrigin: '80px 110px', transformBox: 'view-box' }}
        >
          {minuteTicks.map((i) => {
            const a = (i * 6 * Math.PI) / 180;
            const outer = 39;
            const inner = i % 5 === 0 ? 33 : 36.5;
            return (
              <line
                key={i}
                x1={80 + Math.sin(a) * outer}
                y1={110 - Math.cos(a) * outer}
                x2={80 + Math.sin(a) * inner}
                y2={110 - Math.cos(a) * inner}
                stroke="#D4AF37"
                strokeOpacity={i % 5 === 0 ? 0.55 : 0.22}
                strokeWidth={i % 5 === 0 ? 1.4 : 0.9}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Hour markers */}
        {hourMarks.map((deg) => {
          const a = (deg * Math.PI) / 180;
          const r = 28;
          const isCardinal = deg % 90 === 0;
          return (
            <circle
              key={deg}
              cx={80 + Math.sin(a) * r}
              cy={110 - Math.cos(a) * r}
              r={isCardinal ? 2.2 : 1.3}
              fill="#0A192F"
              fillOpacity={isCardinal ? 0.85 : 0.4}
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1="80"
          y1="110"
          x2="80"
          y2="88"
          stroke="#0A192F"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.85"
          transform="rotate(50 80 110)"
        />

        {/* Minute hand — scroll-linked */}
        <line
          x1="80"
          y1="110"
          x2="80"
          y2="78"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transformOrigin: '80px 110px',
            transformBox: 'view-box',
            transform: `rotate(${handRotation}deg)`,
          }}
        />

        {/* Second hand */}
        <g
          className="motion-safe:animate-second-sweep"
          style={{ transformOrigin: '80px 110px', transformBox: 'view-box' }}
        >
          <line
            x1="80"
            y1="118"
            x2="80"
            y2="74"
            stroke="#1E3A8A"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.9"
          />
          <circle cx="80" cy="110" r="2.5" fill="#1E3A8A" />
        </g>

        {/* Center jewel */}
        <circle cx="80" cy="110" r="3.2" fill="#0A192F" />
        <circle cx="80" cy="110" r="1.6" fill="#D4AF37" />
      </svg>
      </div>
    </div>
  );
}
