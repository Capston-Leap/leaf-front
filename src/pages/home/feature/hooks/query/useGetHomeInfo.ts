import { useQuery } from "@tanstack/react-query";
import { fetchHomeInfo } from "@shared/apis/home.ts";

export const useGetHomeInfo = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['homeInfo'],
    queryFn: () => fetchHomeInfo(),
  });

  return { data, isLoading, isError };
}
