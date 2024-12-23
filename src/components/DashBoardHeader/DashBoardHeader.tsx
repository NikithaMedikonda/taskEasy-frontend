import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  username: string;
  onLogout: () => void;
  toggleProfileModal: () => void;
  showProfileModal: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  username,
  onLogout,
  toggleProfileModal,
  showProfileModal,
}) => {
  const navigate = useNavigate();

  const navigateToAddTask = () => {
    navigate("/addtask");
  };

  return (
    <header className="dashboard-header">
      <h3>Welcome {username}!! 👋</h3>
      <div className="profile-section">
        <button onClick={navigateToAddTask} className="add-task-btn">
          ＋ Add New Task
        </button>
        <button onClick={toggleProfileModal} className="profile-icon">
          👤
        </button>
        {showProfileModal && (
          <div className="profile-modal">
            <p>{username}</p>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
