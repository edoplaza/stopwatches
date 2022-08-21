import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Single from "./components/Single";

import List from "./components/List";

import "./styles/index.css";

import { UniversalRouter } from "./universal-router";

export function Root(props) {
  return (
    <UniversalRouter location={props.location}>
      <Switch>
        <Route exact path="/" component={List} />
        <Route exact path="/single" component={Single} />
      </Switch>
    </UniversalRouter>
  );
}
