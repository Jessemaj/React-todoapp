import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import axios from "axios";

const Tasks = () => {
  const url = "http://localhost:3010/todo";
  const [todo, updateTodo] = useState([]);
  const [message, updateMessage] = useState("");
  //useStates for the tag filter input fields
  const [searchFilter, setSearchFilter] = useState(" ");

  //Get task items from JSON-server
  const getTodo = () => {
    fetch(url)
      .then((response) => response.json())
      .then((allTodo) => updateTodo(allTodo));
  };

  //Delete a task from the database. Is used by clicking the delete button.
  //Gives message after it's done
  const deleteTodo = (id) => {
    // eslint-disable-next-line no-restricted-globals
    axios
      .delete(url + "/" + id)
      .then((response) => {
        updateMessage("Deleted a task");
      })
      .then(getTodo)
      .catch((error) => {
        updateMessage("An error occurred with the action.");
      });
  };

  //If checkbox is pressed, taskCompleted is used. It updates isDone value as true into the database.
  //After that it gets the tasks from the database and checkbox should update to 'checked'.
  //As last step the completed task is copied to 'Done tasks'. User can decide if completed task shall remain in the main list
  const taskCompleted = (id, values) => {
    var isDoneUpdate = {
      task: values.task,
      tag: values.tag,
      isDone: true,
    };

    axios
      .put(url + "/" + id, isDoneUpdate)
      .then(getTodo)
      .then(
        fetch("http://localhost:3010/completed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(isDoneUpdate),
        })
          .then(() => {
            updateMessage(
              "Task is now archived. It's been added to 'Done tasks'"
            );
          })
          .catch((response) => {
            alert("An error occurred");
          })
      );
  };

  //Use getTodo when loading the site
  useEffect(() => {
    getTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  //useState for the drag and drop feature
  const [list, updateList] = useState(todo);

  //Use the original item list 'todo' as a default state for the drag and drop list
  useEffect(() => {
    updateList(todo);
  }, [todo]);

  //Put the task item where the drag ends
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(list);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);

    updateList(items);
  };

  /**
   * In this return first you see the input fields that filter the return with user input.
   * The filtering returns tasks if the search input is included in the tag. So for example
   * if search input is 'work', it will return a task with a tag 'homework'. If the user deletes the
   * search input from one of the input fields, it will return all tasks because ""-string is included
   * in every tag.
   * When deleting a task from the list, updateMessage appears on top of the list.
   * List re-order is done by react-beautiful-dnd. User can drag and drop tasks to order of their choice.
   * Delete button uses deleteTodo when clicked and Edit button opens up a new page to edit the task.
   */
  return (
    <>
      <div className="todo">
        <div id="filter">
          <p>Tag filters</p>
          <input
            type="text"
            className="inputField"
            placeholder="Insert a tag to filter the list"
            onChange={(obj) => setSearchFilter(obj.target.value)}
          />
        </div>
        <p align="center">{message}</p>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                className="taskList"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list
                  // eslint-disable-next-line array-callback-return
                  .filter((todoValues) => {
                    if (searchFilter === " ") {
                      return todoValues;
                    } else if (
                      todoValues.tag
                        .toLowerCase()
                        .includes(searchFilter.toString().toLowerCase())
                    ) {
                      return todoValues;
                    }
                  })
                  .map((todoValues, index) => {
                    return (
                      <>
                        <Draggable
                          key={todoValues.id}
                          draggableId={todoValues.task}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              className="listItem"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <button
                                id="deleteButton"
                                onClick={deleteTodo.bind(this, todoValues.id)}
                              >
                                Delete
                              </button>
                              <button id="editButton">
                                <Link to={`/${todoValues.id}/edittask`}>
                                  Edit
                                </Link>
                              </button>
                              <div id="tag">{todoValues.tag}</div>
                              <input
                                type="checkbox"
                                id="checkbox"
                                checked={todoValues.isDone}
                                onClick={taskCompleted.bind(
                                  this,
                                  todoValues.id,
                                  todoValues
                                )}
                              ></input>
                              <div id="task">{todoValues.task} </div>
                            </li>
                          )}
                        </Draggable>
                      </>
                    );
                  })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Tasks;
