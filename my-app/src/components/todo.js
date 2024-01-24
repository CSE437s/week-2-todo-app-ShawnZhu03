import { STATES } from "mongoose";
import React, { useState, useEffect } from "react";
import "../styles/todostyles.css";

const Todolist = () => {
  const [TODOS, setTODO] = useState([]);
  const [newTaskName, setTaskName] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    fetchTodo();
  }, [TODOS]);

  const fetchTodo = () => {
    fetch("http://localhost:5001/TODOS", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTODO(data))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  const handleAdd = () => {
    const newTODO = { name: newTaskName, task: newTask, date: newDate };
    console.log(newTODO);
    fetch("http://localhost:5001/Add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTODO),
    })
      .then((response) => response.json())
      .then((newTODO) => {
        setTODO([...TODOS, newTODO]);
        setTaskName("");
        setNewTask("");
        setNewDate("");
        fetchTodo();
      })
      .catch((error) => console.error("Error adding note:", error));
  };

  const updateTask = (taskID, isChecked) => {
    fetch("http://localhost:5001/Done", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: taskID, done: isChecked }),
    })
      .then((response) => {
        fetchTodo();
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div className="page-body">
      <h2>To Do </h2>
      <div className="create">
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          className="note-title-input"
          value={newTaskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label>Task:</label>
        <input
          type="text"
          placeholder="Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <label>Date:</label>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />

        <button onClick={handleAdd}>Add New To-do!</button>
      </div>

      {TODOS.map((todo) => (
        <div
          className="task"
          key={todo._id}
          style={{
            margin: "10px",
            cursor: "pointer",
          }}
        >
          <div className="TaskName">{todo.name}</div>

          <div className="TaskTask">{todo.task}</div>

          <div className="TaskDate">
            {new Date(todo.date).toLocaleDateString()}
          </div>
          <input
            checked={todo.done}
            type="checkbox"
            onChange={(e) => updateTask(todo._id, e.target.checked)}
          ></input>
        </div>
      ))}
    </div>
  );
};

export default Todolist;
