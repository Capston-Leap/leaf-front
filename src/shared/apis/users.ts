// src/shared/apis/users.ts
import { axiosInstance } from "@shared/apis/axios-instance.ts";
import { AxiosResponse } from "axios";

export const logoutUser = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post("/user/logout");
    if (response.status !== 204) throw new Error("Logout failed");
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const deleteUser = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.delete("/user");
    if (response.status !== 204) throw new Error("Delete failed");
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const fetchUserProfile = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};
