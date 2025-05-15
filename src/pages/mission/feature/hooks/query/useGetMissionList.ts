import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserMissionList } from "@shared/apis/mission.ts";

export const useGetMissionList = (status: string) => {
  return useInfiniteQuery({
    queryKey: ['supportInfo', status],
    queryFn: ({ pageParam = 0 }) => getUserMissionList(pageParam, 5, status),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.hasNext) {
        return allPages.length; // 다음 pageParam
      }
      return undefined; // 더 이상 로딩하지 않음
    },
    initialPageParam: 0,
  });
};
