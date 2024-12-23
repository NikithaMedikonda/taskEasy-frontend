import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { UserProvider } from "../../context/UserContext";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderDashboard = () => {
    render(
      <UserProvider>
        <Dashboard />
      </UserProvider>
    );
  };

  const TASK_CATEGORIES = ["all", "work", "personal", "other"];


  test("renders header with username and buttons", () => {
    renderDashboard();
    expect(screen.getByText(/Welcome !! 👋/i)).toBeInTheDocument();
    expect(screen.getByText(/＋ Add New Task/i)).toBeInTheDocument();
    expect(screen.getByText("👤")).toBeInTheDocument();
  });

  test("renders category filter buttons", () => {
    renderDashboard();
    const buttons = TASK_CATEGORIES.map((category: string) =>
      screen.getByText(category.charAt(0).toUpperCase() + category.slice(1))
    );
    buttons.forEach((button: any) => expect(button).toBeInTheDocument());
  });

  test("navigates to add task page", () => {
    renderDashboard();

    const addTaskButton = screen.getByText(/＋ Add New Task/i);
    fireEvent.click(addTaskButton);
    expect(mockNavigate).toHaveBeenCalledWith("/addtask");
  });

  test("filters tasks by category", () => {
    renderDashboard();

    const allButton = screen.getByText("All");
    const workButton = screen.getByText("Work");
    const personalButton = screen.getByText("Personal");
    const otherButton = screen.getByText("Other");


    fireEvent.click(workButton);
    expect(allButton).not.toHaveClass("filter-button filter-button-active");
    expect(workButton).toHaveClass("filter-button filter-button-active");
    expect(personalButton).not.toHaveClass("filter-button filter-button-active");
    expect(otherButton).not.toHaveClass("filter-button filter-button-active");
  });

  test("updates sort option by priority", () => {
    renderDashboard();

    const sortSelect = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(sortSelect, { target: { value: "priority" } });

    expect(sortSelect.value).toBe("priority");
  });

  test("updates sort option by completion", () => {
    renderDashboard();
  
    const sortSelect = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(sortSelect, { target: { value: "completion" } });
  
    expect(sortSelect.value).toBe("completion");
  });
  
  test("renders no tasks available message", () => {
    renderDashboard();

    expect(screen.getByText(/No all tasks available/i)).toBeInTheDocument();
  });

  test("toggles profile modal", () => {
    renderDashboard();
  
    const profileButton = screen.getByText("👤");
    fireEvent.click(profileButton);
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  
    fireEvent.click(profileButton);
  });

  test("toggles profile modal visibility", () => {
    renderDashboard();

    const profileButton = screen.getByText("👤");
    fireEvent.click(profileButton);
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    fireEvent.click(profileButton); 
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

});
