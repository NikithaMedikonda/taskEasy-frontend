import React from "react";
import { useForm } from "react-hook-form";
import "../DashBoard/dashboard.css";

interface AddTaskFormProps {
  onSubmit: (data: any) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const form = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="add-task-container">
      <div className="add-task-box">
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit(form)}>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" {...register("title", { required: true })} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input id="description" {...register("description")} />
          </div>
          <div>
            <label htmlFor="taskType">Category</label>
            <select id="taskType"  {...register("taskType", { required: true })}>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority">Priority</label>
            <select id="priority" {...register("priority", { required: true })}>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
