import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@shared/apis/users.ts";
import { useNavigate } from "react-router";
import { useTokenStore } from "@shared/store/useTokenStore.ts";

export const useDeleteUser = () => {
  const { clearToken } = useTokenStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: (response) => {
      if (response?.status === 204) {
        clearToken();
        navigate("/", { replace: true });
      }
    },
  });
};
