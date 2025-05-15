import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSupportInfo } from "@shared/apis/support.ts";

export const useSupportInfoInfinite = (category?: string) => {
  return useInfiniteQuery({
    queryKey: ['supportInfo', category],
    queryFn: ({ pageParam = 0 }) => fetchSupportInfo(pageParam, 10, category),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.hasNext) {
        return allPages.length; // 다음 pageParam
      }
      return undefined; // 더 이상 로딩하지 않음
    },
    initialPageParam: 0,
  });
};
