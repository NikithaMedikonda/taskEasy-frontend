import React, { useState, useEffect } from "react";
import "./dashboard.css";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useNavigate } from "react-router-dom";

const TASK_CATEGORIES = ["all", "work", "personal", "other"];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("Fetching tasks...");
    };
    fetchTasks();
  }, []);

  const filterTasksBy = (category: string) => {
    setSelectedCategory(category);
  };

  const sortTasksBy = (option: string) => {
    setSortOption(option);
  };

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const logout = () => {
    console.log("Logout");
  };

  const navigateToAddTask = () => {
    navigate("/addtask");
  };

  return (
    <div className="dashboard-container">
     <header className="dashboard-header">
        <h3>Welcome {username}!! 👋 </h3>
        <div className="profile-section">
          <button onClick={navigateToAddTask} className="add-task-btn">
            ＋ Add New Task 
          </button>
          <button onClick={toggleProfileModal} className="profile-icon">
            👤
          </button>
          {showProfileModal && (
            <div className="profile-modal">
              <p className="name">{username}</p>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="task-filter">
        {TASK_CATEGORIES.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              selectedCategory === category ? "filter-button-active" : ""
            }`}
            onClick={() => filterTasksBy(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
       
        <select onChange={(e) => sortTasksBy(e.target.value)} value={sortOption}>
          <option value="">Sort By</option>
          <option value="completion">Completion Status</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No {selectedCategory} tasks available</p>
        ) : (
          filteredTasks.map((task: any) => <TaskCard key={task.id} task={task} />)
        )}
      </div>

    </div>
  );
};

export default Dashboard;
