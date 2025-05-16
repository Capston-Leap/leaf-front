import { useQuery } from "@tanstack/react-query";
import { getDiaryList } from "@shared/apis/diary.ts";

export const useGetDiaryList = (year: number, month: number) => {
  return useQuery({
    queryKey: ['diaryList', month],
    queryFn: () => getDiaryList(year, month),
  });
}
