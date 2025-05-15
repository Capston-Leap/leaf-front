import { useQuery } from "@tanstack/react-query";
import { getRecordDetail } from "@shared/apis/mission.ts";

export const useGetRecordDetail = (recordId: number) => {
  return useQuery({
    queryKey: ["missionRecord", recordId],
    queryFn: () => getRecordDetail(recordId),
    enabled: !!recordId,
  })
}
