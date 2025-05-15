import { useInfiniteQuery } from "@tanstack/react-query";
import { getChatHistory } from "@shared/apis/chat.ts";

export const useGetChatHistory = () => {
  return useInfiniteQuery({
    queryKey: ['chatHistory'],
    staleTime: 0,
    queryFn: ({ pageParam = 0 }) => getChatHistory(pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.hasNext) {
        return allPages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
  })
};
