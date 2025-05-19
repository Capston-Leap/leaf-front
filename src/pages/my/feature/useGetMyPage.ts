import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@shared/apis/users.ts";

export const useGetMyPage = () => {
  return useQuery({
    queryKey: ['myPage'],
    queryFn: () => fetchUserProfile(),
  })
};
