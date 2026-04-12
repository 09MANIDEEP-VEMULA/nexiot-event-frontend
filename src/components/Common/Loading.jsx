import React from 'react';

const loading = () => {
  return (
    <div className="loader-wrapper">
      <style>{`
        .loader-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #000;
          overflow: hidden;
        }

        .tesseract {
          position: relative;
          width: 100px;
          height: 100px;
          transform-style: preserve-3d;
          animation: global-rotate 8s infinite linear;
        }

        .cube {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        /* The 4D "Morphed" Inner Cube */
        .inner-cube {
          transform: scale(0.5);
          animation: hyper-flow 4s infinite ease-in-out;
        }

        .face {
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(0, 255, 255, 0.03);
          border: 2px solid #00f2ff;
          box-shadow: 0 0 20px rgba(0, 242, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Inner faces have a different color to create depth contrast */
        .inner-cube .face {
          border-color: #7000ff;
          box-shadow: 0 0 25px rgba(112, 0, 255, 0.6);
          background: rgba(112, 0, 255, 0.05);
        }

        /* 3D Positioning */
        .front  { transform: rotateY(0deg) translateZ(50px); }
        .back   { transform: rotateY(180deg) translateZ(50px); }
        .right  { transform: rotateY(90deg) translateZ(50px); }
        .left   { transform: rotateY(-90deg) translateZ(50px); }
        .top    { transform: rotateX(90deg) translateZ(50px); }
        .bottom { transform: rotateX(-90deg) translateZ(50px); }

        @keyframes global-rotate {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(720deg) rotateZ(360deg); }
        }

        @keyframes hyper-flow {
          0%, 100% { 
            transform: scale(0.3) rotateX(0deg); 
            border-radius: 0%;
          }
          50% { 
            transform: scale(1.1) rotateX(180deg); 
            border-radius: 50%; /* The "4D" fluid transition */
          }
        }
      `}</style>

      <div className="tesseract">
        {/* Outer Frame */}
        <div className="cube outer-cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>

        {/* Inner Morphed Core */}
        <div className="cube inner-cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default loading;