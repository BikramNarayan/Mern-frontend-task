import React from "react";
import Task_List from "./component/Task_List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="app">
      <div className="task-container">
        <Task_List />
      </div>
      <ToastContainer />
    </div>
  );
}
