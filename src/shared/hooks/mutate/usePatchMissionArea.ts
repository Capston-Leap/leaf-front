import { useMutation } from "@tanstack/react-query";
import { patchMissionArea } from "@shared/apis/mission.ts";
import { MissionAreaSettingRequest } from "@shared/types/request/mission.ts";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@shared/store/useUserInfoStore.ts";

export const usePatchMissionArea = () => {
  const navigate = useNavigate();
  const { setCurrentArea } = useUserInfoStore();
  return useMutation({
    mutationFn: (data: MissionAreaSettingRequest) => patchMissionArea(data),
    onSuccess: (data) => {
      if (data) {
        setCurrentArea(data.missionType);
      }
      navigate("/home");
    },
  })
};
