// src/components/StarBackground.jsx
import React, { useMemo } from "react";
import "./StarBackground.css";

const StarBackground = ({ children }) => { 
  const stars = useMemo(() => {
    const starElements = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3.5 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const duration = Math.random() * 5 + 2;

      starElements.push(
        <div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}px`,
            top: `${y}px`,
            animationDuration: `${duration}s`,
          }}
        />
      );
    }

    return starElements;
  }, []); 

  return (
   
    <div className="star-background-wrapper"> 

      <div className="stars-container"> 
        {stars}
      </div>
     
      <div className="app-content-overlay">
        {children}
      </div>
    </div>
  );
};

export default StarBackground;