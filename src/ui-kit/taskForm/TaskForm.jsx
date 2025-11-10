import React, { useState, useEffect } from "react";

import taskForm from "./TaskForm.module.css";

const TaskForm = ({ onAddTask, onClose }) => {
  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    taskDueDate: "",
    taskStatus: "",
  });

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("myTaskData");
    return saved ? JSON.parse(saved) : [];
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(data));
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.taskName.trim() === "" || task.taskDescription.trim() === "") {
      return;
    }
    onAddTask(task);
    setTask({
      taskName: "",
      taskDescription: "",
      taskDueDate: "",
      taskStatus: "",
    });
    console.log("Task submitted");
  };
  return (
    <form className={taskForm.form}>
      <div className={taskForm.field}>
        <label htmlFor="taskName" className={taskForm.label}>
          Task Name
        </label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          required
          className={taskForm.input}
          value={task.taskName}
          onChange={(e) => setTask({ ...task, taskName: e.target.value })}
        />
      </div>
      <div className={taskForm.field}>
        <label htmlFor="taskDescription" className={taskForm.label}>
          Task Description
        </label>
        <textarea
          id="taskDescription"
          name="taskDescription"
          required
          className={taskForm.textarea}
          value={task.taskDescription}
          onChange={(e) =>
            setTask({ ...task, taskDescription: e.target.value })
          }
        ></textarea>
      </div>
      <div className={taskForm.field}>
        <label htmlFor="taskDueDate" className={taskForm.label}>
          Due Date
        </label>
        <input
          type="date"
          id="taskDueDate"
          name="taskDueDate"
          required
          className={taskForm.input}
          value={task.taskDueDate}
          onChange={(e) => setTask({ ...task, taskDueDate: e.target.value })}
        />
      </div>
      <div className={taskForm.field}>
        <label htmlFor="taskStatus" className={taskForm.label}>
          Status
        </label>
        <select
          id="taskStatus"
          name="taskStatus"
          required
          className={taskForm.select}
          value={task.taskStatus}
          onChange={(e) => setTask({ ...task, taskStatus: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="on-hold">On Hold</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
