import React, { useEffect, useState } from 'react';
import { ResizeStyle } from './style';

interface WindowDimensions {
  width: number;
}

function getWindowDimensions(): WindowDimensions {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const Resize: React.FC = () => {
  return (
    <div className="w-100 vh-100">
      <ResizeStyle style={{ height: '100vh' }}>
        <div className="flex justify-center items-center h-screen">
          <div className="box-style min-w-52 flex flex-col justify-center items-center">
            <div>
              <iframe
                src="https://giphy.com/embed/RM0FFEcOLBzEjtrbCK"
                width="200"
                height="200"
                className="giphy-embed"
                allowFullScreen
                title="Pet Healthcare Gif"
              ></iframe>
            </div>
            <h2 className="color-primary">Sorry!</h2>
            <span>We don't support Tablet and Mobile devices.</span>
            <span>Please use Laptop or Desktop instead.</span>
          </div>
        </div>
      </ResizeStyle>
    </div>
  );
};
