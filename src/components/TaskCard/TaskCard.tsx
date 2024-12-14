import React from "react";
import "../../pages/DashBoard/dashboard.css"

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    taskType: string;
    priority: string;
    status: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div>
      <p>Category: {task.taskType}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      </div> 
    </div>
  );
};

export default TaskCard;
