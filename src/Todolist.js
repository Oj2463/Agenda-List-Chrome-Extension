import React, { useState, useEffect } from "react";
import "./Todolist.css";
import logo from "./system-solid-39-trash.png";
import logoedit from "./output-onlinepngtools.png";

function Todolist() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTaskList(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleAddTask = () => {
    if (task.trim() === "") {
      alert("Cannot Be Empty")
      return;
    }

    const dt = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });


    const newTask = {
      text: task,
      hour: dt,
    };

    setTaskList([...taskList, newTask]);
    setTask("");
  };

  const handleDeleteTask = (index) => {
    const updatedList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedList);
  };

  const handleEditTask = (index) => {
    setEditingTaskIndex(index);
    setEditedTask(taskList[index].text);
  };

  const handleSaveTask = (index) => {
    const updatedTaskList = [...taskList];
    const dt = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    updatedTaskList[index].text = editedTask;
    updatedTaskList[index].hour = dt;

    setTaskList(updatedTaskList);
    setEditingTaskIndex();
  };

  return (
    <div className="container">
      <h1 className="header-content">Agenda List</h1>
      <div className="input-container">
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        {taskList.map((task, index) => (
          <div key={index} className="task-item">
            <div className="task-text">
              {editingTaskIndex === index ? (
                <>
                  <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
                  <button onClick={() => handleSaveTask(index)}>Save</button>
                </>
              ) : (
                <>
                  <label><b>Task:</b>{task.text}</label>
                  <div className="task-date"><b>Date:</b>{task.hour}</div>
                </>
              )}
            </div>
            <button className="edit-button" onClick={() => handleEditTask(index)}>
              <img src={logoedit} alt="Edit" />
            </button>
            <button className="remove-button" onClick={() => handleDeleteTask(index)}>
              <img src={logo} alt="Delete" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todolist;
