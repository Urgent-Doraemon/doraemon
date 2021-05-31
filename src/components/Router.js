import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Class from "../routes/Class";
import Home from "../routes/Home";
import Write from "../routes/Write";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/class">
            <Class />
          </Route>
          <Route exact path="/write">
            <Write />
          </Route>
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
