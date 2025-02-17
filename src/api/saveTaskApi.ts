import { API } from "./api";

export const saveTask = async (taskData: any, isEdit: boolean, taskId?: number): Promise<any> => {
  const url = isEdit ? `${API}/task/${taskId}` : `${API}/task/`;
  const method = isEdit ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error occurred while saving task");
    }

    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    throw new Error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
  }
};
