import { useMutation } from "@tanstack/react-query";
import { RegisterUserRequest } from "@shared/types/request/user.ts";
import { registerUser } from "@shared/apis/user.ts";
import { useNavigate } from "react-router-dom";

export const useRegisterMember = () => {
  const navigate = useNavigate();

  const result = useMutation({
    mutationFn: (request: RegisterUserRequest) => registerUser(request),
    onSuccess: () => {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    },
  });

  return result;
};
