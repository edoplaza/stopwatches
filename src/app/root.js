import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import StopWatchList from "./components/StopWatchList";
import StopWatch from "./components/StopWatch";

import "./styles/reset.css";
import "./styles/index.css";

import { UniversalRouter } from "./universal-router";

export function Root(props) {
  return (
    <UniversalRouter location={props.location}>
      <Switch>
        <Route exact path="/" component={StopWatchList} />
        <Route exact path="/stopwatch/:id" component={StopWatch} />
      </Switch>
    </UniversalRouter>
  );
}
