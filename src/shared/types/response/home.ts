import { Info } from "@shared/types/response/support.ts";

export interface HomeInfoResponse {
  nickname: string;
  level: number;
  progress: number;
  remainingMissions: number;
  info: Info
}
