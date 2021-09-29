import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RegisterIndex } from "./views/Register";
import { Dashboard } from "./components/Dashboard";
import { HomeIndex } from "./views/Home";
import history from "./history";
import { LoginIndex } from "./views/Login";

export function Routes() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/register" component={RegisterIndex} />
        <Route exact path="/login" component={LoginIndex} />
        <Dashboard>
          <Route exact path="/" component={HomeIndex} />
        </Dashboard>
      </Switch>
    </BrowserRouter>
  );
}
