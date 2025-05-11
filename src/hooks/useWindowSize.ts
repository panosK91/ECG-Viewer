import { useState, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function useContainerWidth(ref: React.RefObject<HTMLElement>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);

  return width;
}
