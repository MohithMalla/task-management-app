// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import TaskList from "./taskList";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<TaskList />} />
    </Routes>
  );
}

export default App;
