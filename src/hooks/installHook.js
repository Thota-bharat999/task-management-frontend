import { apiRequest } from "./api";

export const fetchStatistics = async () => {
  try {
    const data = await apiRequest("/tasks/statistics");
    console.log("statistics", data);
    return data;
  } catch (err) {
    console.error("Failed to fetch statistics", err);
    throw err;
  }
};