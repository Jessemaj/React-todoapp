import React from "react";
import "./App.css";

class Info extends React.Component {
  render() {
    return (
      <div className="info">
        <h3>Here is information about this project </h3>
        <div>
          Author: Jesse Majaranta <br />
          This todo app is done in React course. I have done this app myself
          with the help of content in the internet. Drag and drop feature is
          done based on
          <a href="https://www.youtube.com/watch?v=aYZRRyukuIw"> this</a> video
          on youtube. The person in this video has the code public on GitHub and
          allows to use the code to create same functionality. All the code I
          have written myself.
        </div>
        <h3> Instructions </h3>
        <div>
          Start the json-server with command "npx json-server -H localhost -p
          3010 -w db.json" in the todo_app folder. <br /> <br />
          <h4>Home</h4>
          In this app you can add new tasks on the home page. You can add the
          task description and a optional tag. You can change the page with the
          navigation bar on the top and click the page name you want to go to.
          <br />
          <br />
          <h4>Tasks</h4>
          In Tasks page you can see all the tasks that have been stored to the
          database. Tasks can be re-ordered by dragging and dropping them to
          wanted positions. You can also see the tag given to a task.
          <br />
          <br />
          Tasks can be filtered with the input fields over the tasks. Type the
          tag you want to the input field and you should see only the tasks that
          have the tag you've typed.
          <br />
          <br />
          By pressing the "Delete" button, you can delete the task. By pressing
          the "Edit" button, you can edit the task. New page will open and you
          can change the task description and/or the task tag. Press the update
          button to update the information to the database. A message should pop
          under the navigation bar and you can return to the previous or other
          page. <br />
          <br /> There is also a white empty box next to the task description.
          It's a checkbox and by pressing you can mark the task as done. This
          action also will make a copy of the task to the "Done tasks" page. So
          clicking the checkbox doesn't automatically delete the task from the
          list. <br />
          <br />
          <h4> Done tasks</h4>
          Done tasks page is for the tasks you have already done. You can scroll
          through them. It shows the task description and the tag. You can also
          delete them, or just leave them alone.
        </div>
      </div>
    );
  }
}

export default Info;
