import twinGearsPng from '../../../icons/Glyphish-Glyphish-20-gear-2.32.png';
import beltStrapsPng from '../../../icons/Iconsmind-Outline-Belt-3.512.png';
import rulerPng from '../../../icons/Designcontest-Outline-Ruler.256.png';

const iconDefaults = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

function IconBase({ className = 'h-6 w-6', strokeWidth = 1.6, children }) {
  return (
    <svg {...iconDefaults} className={className} strokeWidth={strokeWidth}>
      {children}
    </svg>
  );
}

function MaskedPngIcon({ src, className = 'h-6 w-6' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current ${className}`}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}

/** Flat coin / button-cell battery used in watches */
export function WatchBatteryIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12.25" r="7.5" />
      <circle cx="12" cy="12.25" r="4.75" />
      <path d="M12 8.85v3.25" />
      <path d="M10.25 11.1h3.5" />
      <path d="M17.35 6.4l2.1-2.1" />
      <path d="M19.85 6.55V4h-2.55" />
    </IconBase>
  );
}

/** Watch case with cracked crystal */
export function CrackedWatchIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M9 3.4h6v2.6H9z" />
      <path d="M9 18h6v2.6H9z" />
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="1.05" fill="currentColor" stroke="none" />
      <path d="M12 8.2v3.8l2.5 1.55" />
      {/* Crack across the glass */}
      <path d="M8.35 9.1 11.2 11.6 9.7 14.9 12.05 13.35 14.9 15.7 13.55 12.4 16.1 10.15" />
    </IconBase>
  );
}

/** Ruler icon for strap shortening — Designcontest Outline Ruler */
export function StrapStripIcon({ className = 'h-6 w-6' }) {
  return <MaskedPngIcon src={rulerPng} className={className} />;
}

/** Two interlocking gears — uses the Glyphish PNG from client/icons */
export function TwinGearsIcon({ className = 'h-6 w-6' }) {
  return <MaskedPngIcon src={twinGearsPng} className={className} />;
}

/** Strap / belt icon for strap replacement — Iconsmind Outline Belt */
export function ThreeStrapsIcon({ className = 'h-6 w-6' }) {
  return <MaskedPngIcon src={beltStrapsPng} className={className} />;
}
