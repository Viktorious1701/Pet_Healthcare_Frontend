// App.tsx
import "./index.css";
import "@/../app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PreLoader from "./components/preloader/PreLoader";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const [showPreLoader, setShowPreLoader] = useState(location.pathname === '/');

  useEffect(() => {
    const handleLoad = () => {
      setShowPreLoader(location.pathname === '/');
    };

    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, [location.pathname]);

  return (
    <>
      {showPreLoader && <PreLoader />}
      <Outlet />
      
    </>
  );
}

export default App;