import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { getWatches } from "../../features/watchSlice";
import { Link } from "react-router-dom";

function StopWatchList() {
  const [watches, setWatches] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatches()).then((response) => {
      const watches = response.payload.data.result;
      setWatches(watches);
    });
  }, []);

  return (
    <div className="stopwatch-list">
      <div className="stopwatch-list-header">
        <button className="button button-new" onClick={() => {}}>
          New
        </button>
      </div>
      <div className="stopwatch-items">
        {watches.length > 0 &&
          watches.map(({ __id, laps, started, toggles }) => {
            return (
              <div key={__id}>
                <Link to={{ pathname: `/stopwatch/${__id}` }}>
                  <div className="stopwatch-item">
                    {" "}
                    {new Date(started).toISOString().slice(11, 23)}
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      <div className="stopwatch-list-footer">
        <button className="button button-more" onClick={() => {}}>
          More
        </button>
      </div>
    </div>
  );
}

export default withRouter(StopWatchList);
