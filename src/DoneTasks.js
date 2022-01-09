import React, { useEffect, useState } from "react";
import axios from "axios";

//List for completed tasks, user can delete them if they want.
const DoneTasks = () => {
  const url = "http://localhost:3010/completed/";
  const [todo, updateTodo] = useState([]);
  const [message, updateMessage] = useState("");

  //Get completed tasks from JSON-server
  const getTodo = () => {
    fetch(url)
      .then((response) => response.json())
      .then((allTodo) => updateTodo(allTodo));
  };

  //Use 'getTodo' when opening up the pag
  useEffect(() => {
    getTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  //Delete a task from the database. Is used by clicking the delete button.
  //Gives message after it's done
  const deleteTodo = (id) => {
    // eslint-disable-next-line no-restricted-globals
    axios
      .delete("http://localhost:3010/completed/" + id)
      .then((response) => {
        updateMessage("Deleted a task");
      })
      .then(getTodo)
      .catch((error) => {
        updateMessage("An error occurred with the action.");
      });
  };

  //Returns a simple list of completed tasks. User can see the tags and the descriptions and delete them.
  return (
    <>
      <div className="todoDone">
        <p align="center">{message}</p>
        <ul className="taskList">
          {todo.map((todoValues, index) => {
            return (
              <li className="listItem" key={index}>
                <div id="tag">{todoValues.tag}</div>
                <button
                  id="deleteButton"
                  onClick={deleteTodo.bind(this, todoValues.id)}
                >
                  Delete
                </button>
                <div id="task">{todoValues.task} </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DoneTasks;
