import { API } from "./api";

export const registerUser = async (data: { username: string; password: string }) => {
    try {
      const response = await fetch(`${API}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message || 'An error occurred during login';
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };
  