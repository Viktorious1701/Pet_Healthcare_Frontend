/* eslint-disable no-inner-declarations */
import { ReactElement, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollingProps {
  children: ReactElement | ReactElement[];
  enableSmoothing: boolean;
}

function SmoothScrolling({ children, enableSmoothing }: SmoothScrollingProps): ReactElement {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (enableSmoothing) {
      lenisRef.current = new Lenis({
        lerp: 0.05,
        wheelMultiplier: 1,
      });

      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [enableSmoothing]);

  return <>{children}</>;
}

export default SmoothScrolling;
