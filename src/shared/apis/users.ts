// src/shared/apis/users.ts
import { axiosInstance } from "@shared/apis/axios-instance.ts";
import { AxiosResponse } from "axios";
import { MyPAgeResponse } from "@shared/types/response/user.ts";

export const logoutUser = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post("/user/logout");
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const deleteUser = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.delete("/user");
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const fetchUserProfile = async () => {
  try {
    const response: AxiosResponse<MyPAgeResponse> = await axiosInstance.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};
