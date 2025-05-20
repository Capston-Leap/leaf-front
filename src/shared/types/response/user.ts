export interface UserResponse {
  id: number;
  loginId: string;
  name: string;
  nickname: string;
  birth: string;
  registerTime: string;
  chatbotType: string;
  level: number;
  missionType: string;
  userType: string;
  isDeleted: string;
}

export interface ChatbotSettingResponse {
  id: number;
  chatbotType: string;
}

export interface MyPAgeResponse {
  name: string;
  loginId: string;
  chatbotType: string;
  ongoingMissionCount: number;
  completedMissionCount: number;
  myPostCount: number;
}

export interface VerifyIdResponse {
  loginId: string;
  message: string;
}
