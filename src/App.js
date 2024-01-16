import React from "react";
import "./App.css";
import SingleTodoUi from "./Components/SingleTodoUi";
import MainPageUI from "./Components/MainPageUI";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPageUI />} />
        <Route path="/todo/:id" element={<SingleTodoUi />} />
      </Routes>
    </div>
  );
}

export default App;
