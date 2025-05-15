import { useMutation } from "@tanstack/react-query";
import { patchMissionRecord } from "@shared/apis/mission.ts";
import { MissionRecordRequest } from "@shared/types/request/mission.ts";
import { useNavigate } from "react-router-dom";

export const useWriteMissionRecord = (userMissionId: number) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (request: MissionRecordRequest) => patchMissionRecord(userMissionId, request),
    onSuccess: (data) => {
      if (data) {
        navigate('/mission/complete');
      }
    },
    onError: () => {
      navigate('/home')
    }
  });
}
