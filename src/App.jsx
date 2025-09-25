import React, { useEffect, useState } from 'react';

export default function App() {
  const [pressed, setPressed] = useState(false);
  const [nowMs, setNowMs] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const GLOBAL_START_MS = Date.parse('2025-09-25T00:00:00Z');
  const earned = Math.max(0, ((nowMs - GLOBAL_START_MS) / 3600000) * 10);
  const display = `$${earned.toFixed(2)}`;

  return (
    <div className="screen">
      <div className="title-banner">Challenge #1</div>
      <div className="counter" aria-live="polite">{display}</div>
      <div className={`center ${pressed ? 'fade-out' : 'fade-in'}`} aria-hidden={pressed} style={{ pointerEvents: pressed ? 'none' : 'auto' }}>
        {!pressed && (
          <button
            className="cta-btn"
            aria-label="Press"
            onClick={() => setPressed(true)}
          >
            <span className="cta-core" aria-hidden="true"></span>
            <span className="cta-ring" aria-hidden="true"></span>
          </button>
        )}
        {!pressed && (
          <div className="ink" aria-hidden="true">17</div>
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

