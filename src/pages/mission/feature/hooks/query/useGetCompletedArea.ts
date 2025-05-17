import { useQuery } from "@tanstack/react-query";
import { getCompletedMissionArea } from "@shared/apis/mission.ts";

export const useGetCompletedArea = () => {
  return useQuery({
    queryKey: ["completedArea"],
    queryFn: () => getCompletedMissionArea(),
  });
};
