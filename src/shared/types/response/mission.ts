export interface Mission {
  missionRecordId: number;
  missionId: number;
  missionType: string;
  title: string;
  status: string;
}

export interface UserMissionListResponse {
  missionList: Mission[];
  hasNext: boolean;
}

export interface MissionAreaResponse {
  selectedMissionType: string;
  progress: number;
}

export interface MissionStepResponse {
  stepNum: number;
  description: string;
}

export interface MissionDetailResponse {
  missionId: number;
  title: string;
  description: string;
  steps: MissionStepResponse[];
}

export interface MissionRecordResponse {
  recordId: number;
  title: string;
  content: string;
  emotion: string;
  completedTime: string;
}

export interface CompletedMissionAreaResponse {
  completedArea: string[];
}
