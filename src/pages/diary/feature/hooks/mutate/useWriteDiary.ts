import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { postDiary } from "@shared/apis/diary.ts";
import { DiaryCreateRequest } from "@shared/types/request/diary.ts";

export const useWriteDiary = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: DiaryCreateRequest) => postDiary(data),
    onSuccess: () => {
      navigate('/diary');
    },
  });
};
