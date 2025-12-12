import './App.css';
import beepSound from './beep.mp3';
import React, { useState, useEffect, useRef } from 'react';

function App() {const [timeLeft, setTimeLeft] = useState(0);
const [isRunning, setIsRunning] = useState(false);
const [stage, setStage] = useState('menu'); // 'menu' or 'timer'
const timerRef = useRef(null);
const audioRef = useRef(null);

  const boilTimes = {
    soft: 4 * 60,
    runny: 7 * 60,
    hard: 10 * 60,
  };


// Format time as mm:ss
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// Handle timer
const startBoil = (type) => {
  setTimeLeft(boilTimes[type]);
  setStage('timer');
  setIsRunning(true);
};

useEffect(() => {
  if (isRunning) {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          playSound();
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


const playSound = () => {
  if (audioRef.current) {
    audioRef.current.play();
  }
};

const pauseTimer = () => setIsRunning(false);
const resumeTimer = () => setIsRunning(true);
const resetToMenu = () => {

  pauseTimer();
  setStage('menu');
  setTimeLeft(0);

};

  return (
    <div className="timer-container">
  <div className="window-header">
    <span>Egg Timer &lt;3</span>
    <button>✕</button>
  </div>

  <div className="clouds"></div>

  <div className="timer-content">
    {stage === 'menu' ? (
      <>
        <div className="egg"></div>
        <p style={{ fontSize: '10px' }}>How do you want your egg?</p>
        <button onClick={() => startBoil('soft')}>Soft</button>
        <button onClick={() => startBoil('runny')}>Runny</button>
        <button onClick={() => startBoil('hard')}>Hard</button>
      </>
    ) : (
      <>
        <div className="egg"></div>
        <p style={{ fontSize: '10px' }}>Your egg is ready in...</p>
        <div className="time-display">{formatTime(timeLeft)}</div>
        <button onClick={resetToMenu}>Back</button>
      </>
    )}
    <audio ref={audioRef} src={beepSound} preload="auto" />
  </div>
</div>


  );
}

export default App;
