import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@shared/apis/user.ts";

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    queryFn: () => fetchUserInfo(),
  });
};
