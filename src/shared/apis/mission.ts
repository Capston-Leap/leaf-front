import { MissionAreaSettingRequest, MissionRecordRequest } from "@shared/types/request/mission.ts";
import { axiosInstance } from "@shared/apis/axios-instance.ts";
import { AxiosResponse } from "axios";
import {
  MissionAreaResponse,
  MissionDetailResponse,
  MissionRecordResponse,
  UserMissionListResponse,
} from "@shared/types/response/mission.ts";

export const patchMissionArea = async (request: MissionAreaSettingRequest) => {
  try {
    const response = await axiosInstance.patch("/mission/area", request);
    return response.data;
  } catch ( error ) {
    console.error("Failed to patch mission area:", error);
  }
};

export const getUserMissionList = async (page: number, size: number, status: string) => {
  try {
    const response: AxiosResponse<UserMissionListResponse> = await axiosInstance.get('/mission', {
      params: {
        status,
        page,
        size,
      },
    });
    return response.data;
  } catch ( error ) {
    console.error('Error fetching support information:', error);
  }
};

export const getMissionArea = async () => {
  try {
    const response: AxiosResponse<MissionAreaResponse> = await axiosInstance.get('/mission/goal');
    return response.data;
  } catch ( error ) {
    console.error('Error fetching mission area:', error);
  }
};

export const getMissionDetail = async (missionId: number) => {
  try {
    const response: AxiosResponse<MissionDetailResponse> = await axiosInstance.get(`/mission/${missionId}`);
    return response.data;
  } catch ( error ) {
    console.error('Error fetching mission detail:', error);
  }
};

export const patchMissionRecord = async (userMissionId: number, request: MissionRecordRequest) => {
  try {
    const response = await axiosInstance.patch(`/mission/record/${userMissionId}`, request);
    return response.data;
  } catch ( error ) {
    console.error('Error patching mission record:', error);
  }
};

export const getRecordDetail = async (userMissionId: number) => {
  try {
    const response: AxiosResponse<MissionRecordResponse> = await axiosInstance.get(`/mission/record/${userMissionId}`);
    return response.data;
  } catch ( error ) {
    console.error('Error fetching record detail:', error);
  }
}
