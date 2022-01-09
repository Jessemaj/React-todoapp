import React, { useState } from "react";
import "./App.css";

//The home page
const Home = () => {
  const [todoDescription, processDescription] = useState("");
  const [todoTag, processTodoTag] = useState("");
  const [message, updateMessage] = useState("");

  //Saves the information that user has input. isDone goes to the database as false.
  //It's used by clicking the save button
  const save = () => {
    var todoInfo = {
      task: todoDescription,
      tag: todoTag,
      isDone: false,
    };

    //This fetches the JSON-database
    fetch("http://localhost:3010/todo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoInfo),
    })
      .then(() => {
        updateMessage("New task added");
      })
      .catch((response) => {
        alert("An error occurred");
      });
  };

  //Returns a "form" and it is used to add a new todo task.
  //There are two fields, task and tag and a save button
  return (
    <>
      <div className="home">
        <p align="center">{message}</p>
        <h3>This is a Todo app. Add a new task here. </h3>
        <h3>You can also add a tag for the task </h3>
        <table id="newTodo" cellPadding="5">
          <tr>
            <th>Task</th>
            <td>
              <input
                type="text"
                className="inputField"
                placeholder="Enter a task here"
                onChange={(obj) => processDescription(obj.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Tag</th>
            <td>
              <input
                type="text"
                className="inputField"
                placeholder="Optional tag"
                onChange={(obj) => processTodoTag(obj.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th colSpan="2">
              <button id="saveButton" onClick={save}>
                Save
              </button>
            </th>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Home;
