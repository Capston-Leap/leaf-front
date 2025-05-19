import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostDetail } from "@shared/apis/community.ts";

export const usePostDetailInfoInfinite = (communityId: number, postId: number) => {
  return useInfiniteQuery({
    queryKey: ['MyPost', postId],
    queryFn: ({ pageParam = 1 }) => getPostDetail(communityId, postId, pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.hasNext) {
        return allPages.length; // 다음 pageParam
      }
      return undefined; // 더 이상 로딩하지 않음
    },
    initialPageParam: 1,
  });
};
