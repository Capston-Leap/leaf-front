import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@shared/apis/users.ts";
import { useNavigate } from "react-router";
import { useTokenStore } from "@shared/store/useTokenStore.ts";

export const useLogout = () => {
  const { clearToken } = useTokenStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: (response) => {
      if (response?.status === 204) {
        clearToken();
        navigate("/", { replace: true });
      }
    },
  });
};
