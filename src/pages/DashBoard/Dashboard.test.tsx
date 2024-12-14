import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

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
        <Dashboard />
    );
  };

  const TASK_CATEGORIES = ["all", "work", "personal", "other"];


  test("renders header with username and buttons", () => {
    renderDashboard();
    expect(screen.getByText(/Welcome Guest!! 👋/i)).toBeInTheDocument();
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

  test("toggles profile modal", () => {
    renderDashboard();

    const profileButton = screen.getByText("👤");
    fireEvent.click(profileButton);
    expect(screen.getByText("Guest")).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    fireEvent.click(profileButton);
    expect(screen.queryByText("Guest")).not.toBeInTheDocument();
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

    fireEvent.click(workButton);
    expect(allButton).not.toHaveClass("filter-button-active");
    expect(workButton).toHaveClass("filter-button-active");
  });

  test("updates sort option", () => {
    renderDashboard();

    const sortSelect = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(sortSelect, { target: { value: "priority" } });

    expect(sortSelect.value).toBe("priority");
  });

  test("renders no tasks available message", () => {
    renderDashboard();

    expect(screen.getByText(/No all tasks available/i)).toBeInTheDocument();
  });
  
});
