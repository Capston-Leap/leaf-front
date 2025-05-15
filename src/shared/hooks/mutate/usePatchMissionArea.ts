import { useMutation } from "@tanstack/react-query";
import { patchMissionArea } from "@shared/apis/mission.ts";
import { MissionAreaSettingRequest } from "@shared/types/request/mission.ts";
import { useNavigate } from "react-router-dom";

export const usePatchMissionArea = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: MissionAreaSettingRequest) => patchMissionArea(data),
    onSuccess: () => {
      navigate("/home");
    },
  })
};
