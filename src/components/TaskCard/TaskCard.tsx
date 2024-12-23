import React from "react";
import "./taskcard.css";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../../api/deleteTaskApi";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    taskType: string;
    priority: string;
    status: string;
  };
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const navigate = useNavigate();

  const editTask = async () => {
    navigate("/addtask", { state: { task } });
  };

  const handleDelete  = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    const isDeleted = await deleteTask(task.id);

    try {
      const isDeleted = await deleteTask(task.id);
      if (isDeleted) {
        onDelete(task.id);
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div>
        <p>Category: {task.taskType}</p>
        <p>Priority: {task.priority}</p>
        <p>Status: {task.status}</p>
      </div>

      <div className="task-card-actions">
        <button onClick={editTask} className="edit-btn">
          Edit
        </button>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
