import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

/**
 * Interactive before/after comparison.
 * Geometry is LTR so the handle position maps cleanly to clip-path;
 * Hebrew labels sit on the visual sides (אחרי left, לפני right).
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'לפני',
  afterAlt = 'אחרי',
  beforeLabel = 'לפני',
  afterLabel = 'אחרי',
  className = '',
}) {
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;

    const { left, width } = el.getBoundingClientRect();
    if (width <= 0) return;

    const next = ((clientX - left) / width) * 100;
    setPosition(Math.min(Math.max(next, 0), 100));
  }, []);

  const stopDragging = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
  }, []);

  useEffect(() => {
    const onMouseMove = (event) => {
      if (!draggingRef.current) return;
      event.preventDefault();
      updateFromClientX(event.clientX);
    };

    const onTouchMove = (event) => {
      if (!draggingRef.current) return;
      if (event.cancelable) event.preventDefault();
      const touch = event.touches[0];
      if (touch) updateFromClientX(touch.clientX);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', stopDragging);
    window.addEventListener('touchcancel', stopDragging);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDragging);
      window.removeEventListener('touchcancel', stopDragging);
    };
  }, [stopDragging, updateFromClientX]);

  const startDragging = (clientX) => {
    draggingRef.current = true;
    setDragging(true);
    updateFromClientX(clientX);
  };

  const onMouseDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    startDragging(event.clientX);
  };

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    startDragging(touch.clientX);
  };

  const clipInset = `inset(0 ${100 - position}% 0 0)`;
  const motionStyle = {
    transition: dragging
      ? 'none'
      : 'clip-path 0.28s cubic-bezier(0.22, 1, 0.36, 1), left 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
  };

  return (
    <div
      ref={containerRef}
      dir="ltr"
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-label="השוואת לפני ואחרי"
      tabIndex={0}
      className={[
        'relative aspect-[4/5] w-full cursor-ew-resize select-none overflow-hidden rounded-[16px] bg-navy-deep/10 touch-none sm:aspect-[3/4] lg:aspect-[4/5]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          setPosition((prev) => Math.max(prev - 2, 0));
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          setPosition((prev) => Math.min(prev + 2, 100));
        } else if (event.key === 'Home') {
          event.preventDefault();
          setPosition(0);
        } else if (event.key === 'End') {
          event.preventDefault();
          setPosition(100);
        }
      }}
    >
      <img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: clipInset, ...motionStyle }}
      />

      <span
        className="pointer-events-none absolute left-2 top-2 rounded-md bg-navy-deep/70 px-1.5 py-0.5 text-[10px] font-medium text-surface backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs"
        aria-hidden="true"
      >
        {afterLabel}
      </span>
      <span
        className="pointer-events-none absolute right-2 top-2 rounded-md bg-navy-deep/70 px-1.5 py-0.5 text-[10px] font-medium text-surface backdrop-blur-sm sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs"
        aria-hidden="true"
      >
        {beforeLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: `${position}%`, ...motionStyle }}
      >
        <div
          className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-surface"
          style={{ boxShadow: '0 0 12px rgba(10, 25, 47, 0.35)' }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-surface/80 bg-surface text-navy-deep sm:h-11 sm:w-11"
          style={{
            boxShadow:
              '0 4px 14px rgba(10, 25, 47, 0.28), 0 1px 3px rgba(10, 25, 47, 0.12)',
          }}
          aria-hidden="true"
        >
          <ChevronsLeftRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.25} />
        </div>
      </div>
    </div>
  );
}
