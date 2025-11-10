import { useState, useEffect } from "react";
import Card from "../ui-kit/card/Card";
import TaskForm from "../ui-kit/taskForm/TaskForm";
import Popup from "../ui-kit/popup/popup";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("myTaskData");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []); // run once on mount

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem("myTaskData", JSON.stringify(newTasks));
  };

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  return (
    <>
      <h1>Home</h1>
      <button
        style={{ marginBottom: "20px", display: "block", width: "100%" }}
        onClick={() => {
          openPopup();
        }}
      >
        Add Task
      </button>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Popup Title</h2>
        <TaskForm onAddTask={addTask} onClose={() => setIsOpen(false)} />
      </Popup>

      {tasks.map((item, index) => (
        <Card
          key={index}
          title={item.taskName}
          content={item.taskDescription}
        />
      ))}
    </>
  );
};

export default Home;
