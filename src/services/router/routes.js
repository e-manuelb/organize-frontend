import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RegisterIndex } from "../../views/Register";
import { HomeIndex } from "../../views/Home";
import history from "../../history";
import { LoginIndex } from "../../views/Login";
import { FinancesIndex } from "../../views/Finances";
import Dashboard from "../../components/Dashboard";

export function Routes() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/register" component={RegisterIndex} />
        <Route exact path="/login" component={LoginIndex} />
        <Dashboard>
          <Route exact path="/finances" component={FinancesIndex} />
          <Route exact path="/" component={HomeIndex} />
        </Dashboard>
      </Switch>
    </BrowserRouter>
  );
}
