import { useQuery } from "@tanstack/react-query";
import { getDiary } from "@shared/apis/diary.ts";

export const useGetDiaryDetail = (diaryId: number) => {
  return useQuery({
    queryKey: ["diary", diaryId],
    queryFn: () => getDiary(diaryId)
  })
}
