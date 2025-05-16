import { DiaryCreateRequest } from "@shared/types/request/diary.ts";
import { axiosInstance } from "@shared/apis/axios-instance.ts";
import { DiaryDetailResponse, DiaryListResponse } from "@shared/types/response/diary.ts";
import { AxiosResponse } from "axios";

export const postDiary = async (request: DiaryCreateRequest)=> {
  try {
    const response = await axiosInstance.post('/diary', request);
    console.log(response.data);
    return response.data;
  } catch ( error ) {
    console.error("Error posting diary:", error);
  }
}

export const getDiary = async (diaryId: number) => {
  try {
    const response: AxiosResponse<DiaryDetailResponse> = await axiosInstance.get(`/diary/${diaryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching diary:", error);
  }
}

export const getDiaryList = async (year: number, month: number) => {
  try {
    const response: AxiosResponse<DiaryListResponse[]> = await axiosInstance.get(`/diary`, {
      params: {
        year,
        month,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching diary list:", error);
  }
}
