import React, { useState } from 'react';

export default function App() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="screen">
      <div className="title-banner">Challenge #1</div>
      <div className={`center ${pressed ? 'fade-out' : 'fade-in'}`} aria-hidden={pressed} style={{ pointerEvents: pressed ? 'none' : 'auto' }}>
        {!pressed && (
          <button
            className="cta-btn"
            onClick={() => setPressed(true)}
          >
            Press
          </button>
        )}
      </div>

      <div className={`reveal ${pressed ? 'fade-in' : 'fade-out'}`} aria-hidden={!pressed} style={{ pointerEvents: pressed ? 'auto' : 'none' }}>
        {pressed && (
          <>
            <div className="monogram" aria-label="K">K</div>
            <div className="caption">Message Karl</div>
          </>
        )}
      </div>
    </div>
  );
}

