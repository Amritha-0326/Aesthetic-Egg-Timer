import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
const [isRunning, setIsRunning] = useState(false);
const timerRef = useRef(null);

// Format time as mm:ss
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// Handle timer
useEffect(() => {
  if (isRunning) {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  } else {
    clearInterval(timerRef.current);
  }
  return () => clearInterval(timerRef.current);
}, [isRunning]);

const startTimer = () => setIsRunning(true);
const pauseTimer = () => setIsRunning(false);
const resetTimer = () => {
  pauseTimer();
  setTimeLeft(300); // Reset to 5 minutes
};

  return (
    <div className="timer-container">
      <h1>🥚 Egg Timer</h1>
      <div className="time-display">{formatTime(timeLeft)}</div>
      <div className="buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

    </div>
  );
}

export default App;
