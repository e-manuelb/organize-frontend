import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RegisterIndex } from "../views/Register";
import { HomeIndex } from "../views/Home";
import history from "../history";
import { LoginIndex } from "../views/Login";
import { FinancesIndex } from "../views/Finances";
import { ToDoIndex } from "../views/ToDo";
import { DiaryIndex } from "../views/Diary";
import { StudyIndex } from "../views/Study";
import Dashboard from "../components/Dashboard";
import { NewDiaryPage } from "../views/Diary/newPage";
import { ReadOrEditIndex } from "../views/Diary/readOrEdit";

export function Routes() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/register" component={RegisterIndex} />
        <Route exact path="/login" component={LoginIndex} />
        <Dashboard>
          {/* Finances area */}
          <Route exact path="/finances" component={FinancesIndex} />
          {/* ToDo area */}
          <Route exact path="/toDo" component={ToDoIndex} />
          {/* Diary area */}
          <Route exact path="/diary" component={DiaryIndex} />
          <Route exact path="/diary/new" component={NewDiaryPage} />
          <Route exact path="/diary/:readOrEdit/:id" component={ReadOrEditIndex} />
          {/* Study area */}
          <Route exact path="/study" component={StudyIndex} />
          {/* Home area */}
          <Route exact path="/" component={HomeIndex} />
        </Dashboard>
      </Switch>
    </BrowserRouter>
  );
}
