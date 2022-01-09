import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
  const { id } = useParams();
  const url = "http://localhost:3010/todo";
  const [todoDescription, processDescription] = useState("");
  const [todoTag, processTodoTag] = useState("");
  const [todoIsDone, processTodoIsDone] = useState("");

  const [message, updateMessage] = useState("");

  //Gets the task that user wants to edit and stores the task description and tag to useState
  const getTodo = () => {
    axios.get(url + "/" + id).then((response) => {
      processDescription(response.data.task);
      processTodoTag(response.data.tag);
      processTodoIsDone(response.data.isDone);
    });
  };

  useEffect(() => {
    getTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  //User gives new value(s) to task and/or tag. User sees the previous values when editing the task.
  //Updates the given values to database
  const updateTodo = () => {
    var todoInfo = {
      task: todoDescription,
      tag: todoTag,
      isDone: todoIsDone,
    };
    axios.put(url + "/" + id, todoInfo).then((response) => {
      updateMessage('Edited the task to "' + todoDescription + '"');
    });
  };

  //Returns edit page for the selected task. User sees two fields, task and tag.
  //Page is similar to the home page
  return (
    <>
      <div>
        <h3>Your'e editing a task with an id of {id} </h3>
      </div>
      <div className="home">
        <p align="center">{message}</p>
        <table id="newTodo" cellPadding="5">
          <tr>
            <th>Task</th>
            <td>
              <input
                type="text"
                className="inputField"
                value={todoDescription}
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
                value={todoTag}
                onChange={(obj) => processTodoTag(obj.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th colSpan="2">
              <button id="updateButton" onClick={updateTodo}>
                Update
              </button>
            </th>
          </tr>
        </table>
      </div>
    </>
  );
};

export default EditTask;
