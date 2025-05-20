import { useMutation } from "@tanstack/react-query";
import { VerifyIdRequest } from "@shared/types/request/user.ts";
import { verifyLoginId } from "@shared/apis/user.ts";

export const useVerifyLoginId = () => {
  return useMutation({
    mutationFn: (data: string) => {
      const request: VerifyIdRequest = {
        loginId: data,
      };
      return verifyLoginId(request);
    },
  });
};
