import { useEffect, useReducer, useState } from "react";
import "./App.css";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string };

const reducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        { id: crypto.randomUUID(), text: action.payload, completed: false },
      ];
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
  }
};

const filters = ["all", "active", "completed"];

function App() {
  const [tasks, dispatch] = useReducer(reducer, [], () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks !== null ? JSON.parse(storedTasks) : [];
  });

  const [input, setInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    dispatch({ type: "ADD_TASK", payload: input });
    setInput("");
  };

  const handleCompleteTask = (id: string) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const handleDeleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
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
