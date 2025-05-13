import { useMutation } from "@tanstack/react-query";
import { login } from "@shared/apis/user.ts";
import { LoginRequest } from "@shared/types/request/user.ts";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "@shared/store/useTokenStore.ts";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenStore()

  const result = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data) => {
      const token = data.token;
      setToken(token)
      navigate('/home')
    },
  });

  return result;
};
