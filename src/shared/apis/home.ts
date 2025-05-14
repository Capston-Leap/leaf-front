import { axiosInstance } from "@shared/apis/axios-instance.ts";
import { HomeInfoResponse } from "@shared/types/response/home.ts";
import { AxiosResponse } from "axios";

export const fetchHomeInfo = async (): Promise<HomeInfoResponse> => {
  try {
    const response: AxiosResponse<HomeInfoResponse> = await axiosInstance.get('/home');
    return response.data;
  } catch (error) {
    console.error('Error fetching home info:', error);
    throw error;
  }
}
