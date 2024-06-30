const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_SECRET_KEY || "my_secret_key"}`;

export const fetchData = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: { Authorization: AUTH_TOKEN },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateData = async (data: string) => {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: AUTH_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const verifyData = async () => {
  try {
    const response = await fetch(`${API_URL}/verify`, {
      method: "POST",
      headers: { Authorization: AUTH_TOKEN },
    });
    const { valid } = await response.json();
    return valid;
  } catch (error) {
    console.error("Error verifying data:", error);
    throw error;
  }
};
