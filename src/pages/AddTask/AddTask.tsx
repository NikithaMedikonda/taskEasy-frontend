import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./add-task.css";
import { useUserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { saveTask } from "../../api/saveTaskApi";

interface AddTaskFormProps {
  onSubmit: (data: any) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const taskToEdit = location.state?.task;

  useEffect(() => {
    if (taskToEdit) {
      setValue("title", taskToEdit.title);
      setValue("description", taskToEdit.description);
      setValue("taskType", taskToEdit.taskType);
      setValue("priority", taskToEdit.priority);
      setValue("status", taskToEdit.status || "pending");
    }
  }, [taskToEdit, setValue]);

  const form = async (data: any) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      const taskData = { ...data, userId: user.id };
      const isEdit = !!taskToEdit;

      const updatedTask = await saveTask(taskData, isEdit, taskToEdit?.id);

      onSubmit(updatedTask);
      reset();
      navigate("/dashboard");
    } catch (error) {
      alert("Error occurred while adding or updating task");
    }
  };

  return (
    <div className="add-task-container">
      <div className="add-task-box">
        <h3>{taskToEdit ? "Edit Task" : "Add New Task"}</h3>
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
            <select id="taskType" {...register("taskType", { required: true })}>
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

          {taskToEdit && (
            <div>
              <label htmlFor="status">Status</label>
              <select id="status" {...register("status", { required: true })}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}

          <button type="submit">
            {taskToEdit ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
