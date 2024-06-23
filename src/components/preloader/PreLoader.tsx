import { useEffect } from "react";
import "./preloader.css";
import { preLoaderAnim } from "../animations/animations";
import paw from "@/assets/Paw2.svg"

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);

  return (
    <div className="preloader">
      <div className="paw">
        <img src={paw} alt="Paw icon" />
      </div>
      <div className="texts-container">
        <span>Pamper,</span>
        <span>Train,</span>
        <span>Aid.</span>
      </div>
    </div>
  );
};

export default PreLoader;
