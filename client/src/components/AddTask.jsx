import { useState } from "react";
import { createTask } from "../api/taskApi";

export default function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newTask = await createTask(title, priority);
      onTaskAdded(newTask);
      setTitle("");
      setPriority("Medium");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Task Priority"
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
