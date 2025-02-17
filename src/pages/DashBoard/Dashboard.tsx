import React, { useState, useEffect } from "react";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import DashboardHeader from "../../components/DashBoardHeader/DashBoardHeader";
import TaskFilter from "../../components/TaskFilter/TaskFilter";
import { fetchUserTasks } from "../../api/fetchUserTasksApi";
import "./dashboard.css";

enum taskTypes  {
  WORK = "work",
  PERSONAL = "personal",
  OTHER = "other"
}
 
enum priorityTypes {
  HIGH = "high",
  LOW = "low"
}

enum statusTypes {
  PENDING = "pending",
  COMPLETED = "completed"
}

interface Task {
  id: number;
  title: string;
  description: string;
  taskType: taskTypes;
  priority: priorityTypes;
  status: statusTypes;
}

const TASK_CATEGORIES = ["all", "work", "personal", "other"];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.id) return;

      try {
        const tasks = await fetchUserTasks(user.id);
        setTasks(tasks);
        setFilteredTasks(tasks);
      } catch (error) {
        console.error("Error occurred while fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [user]);

  const filterTasksBy = (category: string) => {
    setSelectedCategory(category);

    let updatedTasks =
      category === "all"
        ? tasks
        : tasks.filter((task) => task.taskType === category);

    setFilteredTasks(updatedTasks);
    applySorting(updatedTasks, sortOption);
  };

  const sortTasksBy = (option: string) => {
    setSortOption(option);
    applySorting(filteredTasks, option);
  };

  const applySorting = (tasksToSort: Task[], option: string) => {
    let sortedTasks = [...tasksToSort];

    if (option === "completion") {
      sortedTasks.sort((a: any, b: any) => a.status.localeCompare(b.status));
    } else if (option === "priority") {
      const priorityOrder = { high: 1, low: 2 };
      sortedTasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }

    setFilteredTasks(sortedTasks);
  };

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        username={user?.username || ""}
        onLogout={logout}
        toggleProfileModal={toggleProfileModal}
        showProfileModal={showProfileModal}
      />

      <TaskFilter
        categories={TASK_CATEGORIES}
        selectedCategory={selectedCategory}
        onFilter={filterTasksBy}
        onSort={sortTasksBy}
        sortOption={sortOption}
      />

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No {selectedCategory} tasks available</p>
        ) : (
          filteredTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={(id) => {
                const updatedTasks = tasks.filter((task) => task.id !== id);
                setTasks(updatedTasks);

                let newFilteredTasks = updatedTasks;
                if (selectedCategory !== "all") {
                  newFilteredTasks = updatedTasks.filter(
                    (task) => task.taskType === selectedCategory
                  );
                }
                applySorting(newFilteredTasks, sortOption);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
