import React, { useState,useEffect } from "react";
import "./Todolist.css";
import logo from "./system-solid-39-trash.png";

function Todolist() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTaskList(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    setTaskList([...taskList, task]);
    setTask("");
  };

  const handleDeleteTask = (index) => {
    const updatedList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedList);
  };

  const [hour, setHour] = useState(0)

  useEffect(()=>{
    setInterval(() => {
        var dt=new Date().toLocaleString()
        setHour(dt)
    })
  })

  return (
    <div className="container">
        <h1 className="header-content">ToDo List</h1>
      <div className="input-container">
        <input type="text" value={task} onChange={handleChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        {taskList.map((task, index) => (
          <div key={index} className="task-item">
            <div className="task-text">
              <input className="task-text" id="cbox" type="checkbox"/>
              <label>{task}</label>
              </div>
            <div className="task-text">{hour}</div>
            <button className="remove-button" onClick={() => handleDeleteTask(index)}><img src={logo}/></button>
            {/* <button className="remove-button" onClick={() => handleDeleteTask(index)}>Delete</button> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todolist;
