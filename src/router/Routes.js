import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterIndex } from "../views/Register";
import { HomeIndex } from "../views/Home";
import { LoginIndex } from "../views/Login";
import { FinancesIndex } from "../views/Finances";
import { ToDoIndex } from "../views/ToDo";
import { DiaryIndex } from "../views/Diary";
import { StudyIndex } from "../views/Study";
import { Dashboard } from "../components/Dashboard";
import { NewDiaryPage } from "../views/Diary/newPage";
import { ReadOrEditIndex } from "../views/Diary/readOrEdit";
import { getToken } from "../services/Auth";
import history from "../history";

export function Adresses() {

  function loggedIn() {
    if (!getToken()) {
      return false;
    }
    return getToken() !== "null" && getToken() !== "";
  }

  function PrivateRoute({ children }) {
    const auth = loggedIn();
    return auth ? children : <Navigate to="/login" />;
  }

  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/register/" element={<RegisterIndex />} />
        <Route exact path="/login/" element={<LoginIndex />} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path="finances" element={<FinancesIndex />} />
          <Route path="todo" element={<ToDoIndex />} />
          <Route path="diary" element={<DiaryIndex />} />
          <Route path="diary/new" element={<NewDiaryPage />} />
          <Route path="diary/:readOrEdit/:id" element={<ReadOrEditIndex />} />
          <Route path="study" element={<StudyIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
