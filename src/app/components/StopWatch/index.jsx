import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getWatch,
  deleteWatch,
  resetWatch,
  addToggle,
  addLap,
} from "../../features/watchSlice";
import c from "classnames";

import "./styles.css";

function StopWatch() {
  const [toggles, setToggles] = useState([]);
  const [laps, setLaps] = useState([]);
  const [diffs, setDiffs] = useState([]);
  const [isStartShown, setIsStartShown] = useState(true);
  const [isStopShown, setIsStopShown] = useState(false);
  const [isLapShown, setIsLapShown] = useState(true);
  const [isResetShown, setIsResetShown] = useState(false);
  const [maxTime, setMaxTime] = useState(null);
  const [minTime, setMinTime] = useState(null);

  const [timer, setTimer] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  const counterRef = useRef(null);
  const requestRef = useRef(null);

  const id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    dispatch(getWatch(id)).then((response) => {
      if (response.payload) {
        const { started, toggles, laps } = response.payload.data.result;
        if (toggles.length > 0) {
          setTimer(Date.now() - started);
          counterRef.current = Date.now() - started;
        } else {
          handleReset();
        }

        setToggles(toggles);
        setLaps(laps);
      }
    });
  }, []);

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

  const animateTimer = () => {
    counterRef.current = counterRef.current + 1000 / 60;
    setTimer(counterRef.current);
    requestRef.current = requestAnimationFrame(animateTimer);
  };

  function handleStart() {
    const now = Date.now();
    setToggles([...toggles, now]);
    requestRef.current = requestAnimationFrame(animateTimer);
    setIsStartShown(false);
    setIsStopShown(true);
    setIsResetShown(false);
    setIsLapShown(true);

    dispatch(addToggle({ id: id, time: now })).then((response) => {
      console.log("response", response);
    });
  }

  function handleDelete() {
    dispatch(deleteWatch(id)).then((response) => {
      if (response.payload) {
        window.location.href = "/";
      }
    });
  }

  function handleStop() {
    const now = Date.now();
    setToggles([...toggles, now]);
    cancelAnimationFrame(requestRef.current);
    setIsStartShown(true);
    setIsStopShown(false);
    setIsLapShown(false);
    setIsResetShown(true);

    dispatch(addToggle({ id: id, time: now })).then((response) => {
      console.log("response", response);
    });
  }

  function handleLaps() {
    const now = Date.now();
    setLaps([...laps, now]);
    dispatch(addLap({ id: id, time: now })).then((response) => {
      console.log("response", response);
    });
  }

  function handleReset() {
    setTimer(0);
    counterRef.current = 0;
    setToggles([]);
    setLaps([]);
    setDiffs([]);
    setIsResetShown(false);
    setIsLapShown(true);

    dispatch(resetWatch({ id: id, started: Date.now() })).then((response) => {
      if (response.payload) {
        console.log("watch has been reset");
      }
    });
  }

  return (
    <div className="stopwatch">
      <div className="stopwatch-header">
        <Link to="/">
          <span className="button-small">Home</span>
        </Link>
        <span className="button-small" onClick={() => handleDelete()}>
          Delete
        </span>
      </div>
      <div className="clock">
        <h2 className="clock-time">
          {new Date(timer).toISOString().slice(14, 22)}
        </h2>
      </div>
      <div className="actions">
        {isLapShown && (
          <button
            className={c("button button-lap", {
              "button-disabled": isStartShown,
            })}
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
                    .slice(14, 22)}`}</span>
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
