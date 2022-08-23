import React from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const watches = [
  {
    __id: 3,
    laps: [1587807696286],
    started: 1587807510806,
    toggles: [],
  },
  {
    __id: 2,
    laps: [],
    started: 1587807410626,
    toggles: [1587807620331, 1587807760877, 1587807709934, 1587807785664],
  },
  {
    __id: 1,
    laps: [],
    started: 1587807345496,
    toggles: [1587807652309, 1587807686826],
  },
];

function StopWatchList() {
  return (
    <div className="stopwatch-list">
      <h1>Stopwatch list</h1>
      <div className="stopwatch-items">
        {watches.map(({ __id, laps, started, toggles }) => {
          return (
            <div>
              <Link
                to={{
                  pathname: `/stopwatch/${__id}`,
                  state: {
                    laps: laps,
                    started: started,
                    toggles: toggles,
                  },
                }}
              >
                {`StopWatch ${__id}`}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(StopWatchList);
