/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import React from 'react';

interface WindowDimensions {
  width: number;
}

function getWindowDimensions(): WindowDimensions {
  const { innerWidth: width } = window;
  return { width };
}

export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


const Resize: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex justify-center items-center h-full">
        <div className="max-w-md flex flex-col justify-center items-center p-4 border border-gray-300 shadow-lg rounded-md bg-white">
          <div>
            <iframe
              src="https://giphy.com/embed/RM0FFEcOLBzEjtrbCK"
              width="200"
              height="200"
              className="mb-4"
              allowFullScreen
              title="Pet Healthcare Gif"
            ></iframe>
          </div>
          <h2 className="text-primary mb-2">Sorry!</h2>
          <span className="text-gray-700">We don't support Tablet and Mobile devices.</span>
          <span className="text-gray-700">Please use Laptop or Desktop instead.</span>
        </div>
      </div>
    </div>
  );
};

export default Resize;


export const ResizeStyle = styled.div`
  .box-style {
    background: ${props => props.theme.colors.light};
    box-shadow: 0px 29px 184px -14px ${props => props.theme.colors.primaryLight};
    border-radius: 0.7em;
    padding: 2em;
  }
  .box-style h2 {
    font-family: 'Quicksand', sans-serif;
    font-weight: 900;
    font-size: 2.5em;
  }
  .h-100 {
    height: 90%;
  }
  .vh-100 {
    height: 100vh;
  }
  .color-primary {
    color: ${props => props.theme.colors.primary};
  }
  .image {
    width: 2em;
  }
  iframe {
    pointer-events: none;
  }
  .bg-dark-secondary {
    background: ${props => props.theme.colors.secondary};
  }
  @media (max-width: 480px) {
    iframe {
      width: 100px;
      height: 100px;
    }
    * {
      font-size: 0.9em;
    }
    .box-style {
      padding: 1em;
    }
    .box-style h2 {
      font-size: 2em;
    }
  }
`;