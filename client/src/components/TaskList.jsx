import { updateTask } from "../api/taskApi";

export default function TaskList({ tasks, onTaskUpdated }) {
  const handleToggle = async (id, completed) => {
    try {
      const updatedTask = await updateTask(id, !completed);
      onTaskUpdated(updatedTask);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "badge-high";
      case "low":
        return "badge-low";
      case "medium":
      default:
        return "badge-medium";
    }
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p className="empty-tasks">No tasks yet. Add one above to get started!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <label className="task-item-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id, task.completed)}
                />
                <span className="task-title">{task.title}</span>
              </label>
              <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                {task.priority || "Medium"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
