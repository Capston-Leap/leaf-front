import { axiosInstance } from "@shared/apis/axios-instance.ts";
import {
  ChatbotSettingRequest,
  LoginRequest,
  RegisterUserRequest,
  VerifyIdRequest,
} from "@shared/types/request/user.ts";
import { AxiosResponse } from "axios";
import { ChatbotSettingResponse, UserResponse } from "@shared/types/response/user.ts";

export const registerUser = async (request: RegisterUserRequest) => {
  try {
    const response = await axiosInstance.post("/user/register", request)
    return response.data;
  } catch ( error ) {
    console.error("Failed to register user:", error);
  }
}

export const login = async (request: LoginRequest) => {
  try {
    const response = await axiosInstance.post("/user/login", request)
    return response.data;
  } catch ( error ) {
    console.error("Failed to login:", error);
  }
}

export const fetchUserInfo = async () => {
  try {
    const response: AxiosResponse<UserResponse> = await axiosInstance.get("/user/me")
    return response.data;
  } catch ( error ) {
    console.error("Failed to fetch user info:", error);
  }
}

export const patchChatbotSetting = async (request: ChatbotSettingRequest) => {
  try {
    const response: AxiosResponse<ChatbotSettingResponse> = await axiosInstance.patch("/user/chatbot", request)
    return response.data;
  } catch ( error ) {
    console.error("Failed to patch chatbot setting:", error);
  }
}

export const verifyLoginId = async (request: VerifyIdRequest) => {
  try {
    const response: AxiosResponse = await axiosInstance.post("/user/register/verify", request)
    return response;
  } catch ( error ) {
    console.error("Failed to verify login ID:", error);
  }

}
