import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Live Clock
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Timer
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <h1>🕒 Real Clocker and Timer</h1>

      <div className="clock">
        <h2>Current Time</h2>
        <p>{time.toLocaleTimeString()}</p>
      </div>

      <div className="timer">
        <h2>Timer</h2>
        <p>{formatTime(timer)}</p>
        <div className="buttons">
          <button onClick={() => setIsRunning(true)}>Start</button>
          <button onClick={() => setIsRunning(false)}>Stop</button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimer(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <footer>
        <p>Made with ❤️ by You (Real Clocker)</p>
      </footer>
    </div>
  );
}

export default App;
