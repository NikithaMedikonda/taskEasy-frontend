import { API } from "./api";

export const fetchUserTasks = async (userId: number) => {
  try {
    const response = await fetch(`${API}/task/${userId}`);

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse.message || "An error occurred during login";
      throw new Error(errorMessage);
    }
  } catch (error: any) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};
