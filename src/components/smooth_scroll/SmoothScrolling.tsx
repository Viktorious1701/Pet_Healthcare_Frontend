import { ReactElement, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollingProps {
  children: ReactElement | ReactElement[];
}

function SmoothScrolling({ children }: SmoothScrollingProps): ReactElement {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // Makes the scroll smoother
      wheelMultiplier: 1, // Controls the scroll speed
    });

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    
    let animationFrameId = requestAnimationFrame(raf);
    
    // Cleanup function to cancel the animation frame when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScrolling;