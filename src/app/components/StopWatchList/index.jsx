import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { getWatches, createWatch } from "../../features/watchSlice";
import { Link } from "react-router-dom";

import "./styles.css";

function StopWatchList() {
  const [watches, setWatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatches(currentPage)).then((response) => {
      if (response.payload) {
        setIsButtonDisabled(false);
        const watches = response.payload.data.result;
        setWatches(watches);
      }
    });
  }, [setWatches]);

  function handleGetMore() {
    setIsButtonDisabled(true);
    dispatch(getWatches(currentPage + 1)).then((response) => {
      setIsButtonDisabled(false);
      if (response.payload) {
        const moreWatches = response.payload.data.result;
        if (!!moreWatches.length) {
          setWatches([...watches, ...moreWatches]);
        } else {
          console.log("No more watches to display");
        }
      }
    });
    setCurrentPage(currentPage + 1);
  }

  function handleCreateWatch() {
    setIsButtonDisabled(true);
    dispatch(createWatch(Date.now())).then((response) => {
      if (response.payload) {
        setIsButtonDisabled(false);
        const id = response.payload.data.__id;
        window.location.href = `/stopwatch/${id}`;
      }
    });
  }

  return (
    <div className="stopwatch-list">
      <div className="stopwatch-list-header">
        <button
          className="button button-new"
          onClick={() => handleCreateWatch()}
          disabled={isButtonDisabled}
        >
          New
        </button>
      </div>
      <div className="stopwatch-items">
        {watches.length > 0 &&
          watches.map(({ __id, started }) => {
            return (
              <div key={__id}>
                <Link to={{ pathname: `/stopwatch/${__id}` }}>
                  <div className="stopwatch-item">
                    {new Date(started).toISOString().slice(11, 23)}
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
      <div className="stopwatch-list-footer">
        <button
          className="button button-more"
          onClick={() => handleGetMore()}
          disabled={isButtonDisabled}
        >
          More
        </button>
      </div>
    </div>
  );
}

export default withRouter(StopWatchList);
