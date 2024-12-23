import { API } from "./api";

export const deleteTask = async (taskId: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API}/task/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    throw new Error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
  }
};
