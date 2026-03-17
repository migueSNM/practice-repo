import { useEffect, useState } from "react";
import "./App.css";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const filters = ["all", "active", "completed"];

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks !== null ? JSON.parse(storedTasks) : [];
  });
  const [input, setInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    setTasks((prevState) => [
      ...prevState,
      { id: crypto.randomUUID(), text: input, completed: false },
    ]);

    setInput("");
  };

  const handleCompleteTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleActiveFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "active") {
      return !task.completed;
    } else if (activeFilter === "completed") {
      return task.completed;
    }
    return true; // returns all the tasks
  });

  return (
    <div className="wrapper">
      <h1>Task Manager</h1>
      <div className="add-task-field">
        <p>New task:</p>
        <input
          value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
        />
        <button disabled={input === ""} onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <div className="tasks-header">
        <h2>Tasks</h2>
        <p>{filteredTasks.length}</p>
      </div>
      <div className="filters-container">
        {filters.map((filter) => (
          <button
            className={filter === activeFilter ? "is-active" : ""}
            onClick={() => handleActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      {filteredTasks.map((task) => (
        <div className="task-field" key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onClick={() => handleCompleteTask(task.id)}
          />
          <p className={task.completed ? "is-completed" : ""}>{task.text}</p>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
