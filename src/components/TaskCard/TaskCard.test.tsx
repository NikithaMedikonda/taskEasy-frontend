import React from "react";
import { render, screen } from "@testing-library/react";
import TaskCard from "./TaskCard";

describe("TaskCard Component", () => {
  const mockTask = {
    id: "1",
    title: "Test Task",
    description: "This is a test task description",
    taskType: "Work",
    priority: "High",
    status: "Pending",
  };

  test("renders task title", () => {
    render(<TaskCard task={mockTask} />);
    const titleElement = screen.getByText(mockTask.title);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders task description", () => {
    render(<TaskCard task={mockTask} />);
    const descriptionElement = screen.getByText(mockTask.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders task category", () => {
    render(<TaskCard task={mockTask} />);
    const categoryElement = screen.getByText(`Category: ${mockTask.taskType}`);
    expect(categoryElement).toBeInTheDocument();
  });

  test("renders task priority", () => {
    render(<TaskCard task={mockTask} />);
    const priorityElement = screen.getByText(`Priority: ${mockTask.priority}`);
    expect(priorityElement).toBeInTheDocument();
  });

  test("renders task status", () => {
    render(<TaskCard task={mockTask} />);
    const statusElement = screen.getByText(`Status: ${mockTask.status}`);
    expect(statusElement).toBeInTheDocument();
  });

  test("does not render incorrect task status", () => {
    render(<TaskCard task={mockTask} />);
    const wrongStatusElement = screen.queryByText("Status: Completed");
    expect(wrongStatusElement).toBeNull();
  });
});
