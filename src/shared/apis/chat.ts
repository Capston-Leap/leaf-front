import { LeapyRequest } from "@shared/types/request/chat.ts";
import { AxiosResponse } from "axios";
import { ChatResponse, LeapyResponse } from "@shared/types/response/chat.ts";
import { axiosInstance } from "@shared/apis/axios-instance.ts";

export const chat = async (request: LeapyRequest) => {
  try {
    const response: AxiosResponse<LeapyResponse> = await axiosInstance.post("/chat", request);
    return response.data;
  }  catch (error) {
    console.error("Error fetching chat response:", error);
  }
}

export const getChatHistory = async (page:number, size: number) => {
  try {
    const response: AxiosResponse<ChatResponse> = await axiosInstance.get("/chat", {
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
}
