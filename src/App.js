import React from "react";
import "./App.css";
import Home from "./Home";
import Info from "./Info";
import NavigationBar from "./NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditTask from "./EditTask";
import Tasks from "./Tasks";
import DoneTasks from "./DoneTasks";

//Main app used with react-router
//All page paths are in this function
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />
        <Routes>
          <>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/donetasks" element={<DoneTasks />} />
            <Route path="/info" element={<Info />} />
            <Route path="/:id/edittask" element={<EditTask />} />
          </>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
