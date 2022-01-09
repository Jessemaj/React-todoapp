import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

//Navigation bar at the top of the site
//Has links to home, tasks, done tasks and info
class NavigationBar extends React.Component {
  render() {
    return (
      <nav>
        <ul className="navbar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/donetasks">Done tasks</Link>
          </li>
          <li>
            <Link to="/info">Info</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavigationBar;
