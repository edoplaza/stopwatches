import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router";
import c from "classnames";

const initialValues = {
  started: null,
  laps: [],
  toggles: [],
};

function StopWatch() {
  const [started, setStarted] = useState(initialValues.started);
  const [toggles, setToggles] = useState(initialValues.toggles);
  const [laps, setLaps] = useState(initialValues.laps);
  const [diffs, setDiffs] = useState([]);
  const [isStartShown, setIsStartShown] = useState(true);
  const [isStopShown, setIsStopShown] = useState(false);
  const [isLapShown, setIsLapShown] = useState(true);
  const [isResetShown, setIsResetShown] = useState(false);
  const [maxTime, setMaxTime] = useState(null);
  const [minTime, setMinTime] = useState(null);

  const counterRef = useRef(started);
  const requestRef = useRef();

  const animateTimer = () => {
    counterRef.current = counterRef.current + 1000 / 60;
    setStarted(counterRef.current);
    requestRef.current = requestAnimationFrame(animateTimer);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    if (toggles && laps) {
      let diffs = [];

      if (!!laps.length === 0 && !toggles.length) {
        diffs.push(toggles[toggles.length - 1]);
      } else {
        laps.forEach((lap, i) => {
          let diff = 0;
          const previousToggles = toggles.filter((toggle) => toggle < lap);
          const closerToggle = previousToggles[previousToggles.length - 1];
          if (i === 0 || laps[i] - laps[i - 1] > laps[i] - closerToggle) {
            diff = lap - closerToggle;
          } else {
            diff = lap - laps[i - 1];
          }
          setMaxTime(Math.max(...diffs));
          setMinTime(Math.min(...diffs));
          diffs.push(diff);
        });
      }

      setDiffs(diffs);
    }
  }, [toggles, laps]);

  function handleStart() {
    setToggles([...toggles, Date.now()]);
    requestRef.current = requestAnimationFrame(animateTimer);
    setIsStartShown(false);
    setIsStopShown(true);
    setIsResetShown(false);
    setIsLapShown(true);
  }

  function handleStop() {
    setToggles([...toggles, Date.now()]);
    cancelAnimationFrame(requestRef.current);
    setIsStartShown(true);
    setIsStopShown(false);
    setIsLapShown(false);
    setIsResetShown(true);
  }

  function handleLaps() {
    setLaps([...laps, Date.now()]);
  }

  function handleReset() {
    setStarted(0);
    counterRef.current = 0;
    setToggles([]);
    setLaps([]);
    setDiffs([]);
    setIsResetShown(false);
    setIsLapShown(true);
  }

  return (
    <div className="stopwatch">
      <div className="clock">
        <h2 className="clock-time">
          {new Date(started).toISOString().slice(11, 23)}
        </h2>
      </div>

      <div className="actions">
        {isLapShown && (
          <button
            className="button button-lap"
            onClick={() => handleLaps()}
            disabled={isStartShown}
          >
            Lap
          </button>
        )}
        {isResetShown && (
          <button className="button button-reset" onClick={() => handleReset()}>
            Reset
          </button>
        )}
        {isStartShown && (
          <button className="button button-start" onClick={() => handleStart()}>
            Start
          </button>
        )}
        {isStopShown && (
          <button className="button button-stop" onClick={() => handleStop()}>
            Stop
          </button>
        )}
      </div>

      <div className="laps">
        {diffs.length > 0 && (
          <div className="laps-items">
            {diffs.map((diff, index) => {
              let isMax = false;
              let isMin = false;
              if (diff === maxTime) isMax = true;
              if (diff === minTime) isMin = true;

              return (
                <div
                  key={index}
                  className={c(["lap", { "lap-max": isMax, "lap-min": isMin }])}
                >
                  <span className="lap-label">{`Lap ${index + 1}`}</span>
                  <span className="lap-time">{`${new Date(diff)
                    .toISOString()
                    .slice(11, 22)}`}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(StopWatch);