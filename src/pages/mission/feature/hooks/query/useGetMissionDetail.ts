import { getMissionDetail } from "@shared/apis/mission.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetMissionDetail = (missionId: number) => {
  return useQuery({
    queryKey: ["mission: ", missionId],
    queryFn: () => getMissionDetail(missionId)
  });
}
