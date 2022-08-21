import React, { useState, useEffect, useRef } from "react";

function Single() {
  const [laps, setLaps] = useState([]);
  const [times, setTimes] = useState([]);
  const [isStartShown, setIsStartShown] = useState(true);
  const [isStopShown, setIsStopShown] = useState(false);
  const [isLapShown, setIsLapShown] = useState(true);
  const [isResetShown, setIsResetShown] = useState(false);
  const [count, setCount] = useState(0);

  const counterRef = useRef(0);
  const pauseRef = useRef(false);

  const animateClock = () => {
    counterRef.current = counterRef.current + 15;
    setCount(counterRef.current);
    if (pauseRef.current) return;
    window.requestAnimationFrame(animateClock);
  };

  useEffect(() => {
    let timeElapsed;
    if (laps.length > 1) {
      timeElapsed = laps[laps.length - 1] - laps[laps.length - 2];
      const timeElapsedToMilliseconds = new Date(timeElapsed)
        .toISOString()
        .slice(11, 23);
      setTimes([...times, timeElapsedToMilliseconds]);
    }
  }, [laps]);

  function handleStart() {
    pauseRef.current = false;
    requestAnimationFrame(animateClock);

    if (laps.length === 0) {
      setLaps([...laps, Date.now()]);
    }
    setIsStartShown(false);
    setIsStopShown(true);
    setIsResetShown(false);
    setIsLapShown(true);
  }

  function handleStop() {
    pauseRef.current = true;
    setIsStartShown(true);
    setIsStopShown(false);
    setIsLapShown(false);
    setIsResetShown(true);
  }

  function handleLap() {
    setLaps([...laps, Date.now()]);
  }
  function handleReset() {
    counterRef.current = 0;
    pauseRef.current = true;
    setCount(0);

    setTimes([]);
    setLaps([]);
    setIsResetShown(false);
    setIsLapShown(true);
  }

  return (
    <div className="stopwatch">
      <div className="stopwatch-clock">
        {new Date(count).toISOString().slice(11, 23)}
      </div>

      <div className="stopwatch-laps">
        {times.length > 0 && (
          <div className="stopwatch-lap">
            {times.map((time, i) => (
              <h2 key={time}>{`Lap ${i + 1}: ${time}`}</h2>
            ))}
          </div>
        )}
      </div>

      <div className="stopwatch-actions">
        {isLapShown && (
          <button onClick={() => handleLap()} disabled={laps.length === 0}>
            Lap
          </button>
        )}
        {isResetShown && <button onClick={() => handleReset()}>Reset</button>}
        {isStartShown && <button onClick={() => handleStart()}>Start</button>}
        {isStopShown && <button onClick={() => handleStop()}>Stop</button>}
      </div>
    </div>
  );
}

export default Single;
