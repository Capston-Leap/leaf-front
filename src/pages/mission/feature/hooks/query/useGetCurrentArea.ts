import { useQuery } from "@tanstack/react-query";
import { getMissionArea } from "@shared/apis/mission.ts";

export const useGetCurrentArea = () => {
  return useQuery({
    queryKey: ["currentArea"],
    queryFn: () => getMissionArea(),
    retry: 1,
    staleTime: 1000,
  })
}
