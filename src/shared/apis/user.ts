import { axiosInstance } from "@shared/apis/axios-instance.ts";
import { LoginRequest, RegisterUserRequest } from "@shared/types/request/user.ts";

export const registerUser = async (request: RegisterUserRequest) => {
  try {
    const response = await axiosInstance.post("/user/register", request)
    console.log(response)
    return response.data;
  } catch ( error ) {
    console.error("Failed to register user:", error);
  }
}

export const login = async (request: LoginRequest) => {
  try {
    const response = await axiosInstance.post("/user/login", request)
    console.log(response)
    return response.data;
  } catch ( error ) {
    console.error("Failed to login:", error);
  }
}
