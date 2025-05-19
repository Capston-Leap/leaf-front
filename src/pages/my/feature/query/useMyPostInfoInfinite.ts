import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyPosts } from "@shared/apis/community.ts";

export const useMyPostInfoInfinite = (communityId: number) => {
  return useInfiniteQuery({
    queryKey: ['MyPost', communityId],
    queryFn: ({ pageParam = 1 }) => fetchMyPosts(communityId, pageParam + 1, 10),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.hasNext) {
        return allPages.length; // 다음 pageParam
      }
      return undefined; // 더 이상 로딩하지 않음
    },
    initialPageParam: 0,
  });
};
