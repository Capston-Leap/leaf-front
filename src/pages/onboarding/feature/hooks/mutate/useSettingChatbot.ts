import { useMutation } from "@tanstack/react-query";
import { ChatbotSettingRequest } from "@shared/types/request/user.ts";
import { patchChatbotSetting } from "@shared/apis/user.ts";
import { useUserInfoStore } from "@shared/store/useUserInfoStore.ts";

export const useSettingChatbot = (handleNext: () => void) => {
  const { setLeapyType } = useUserInfoStore();
  return useMutation({
    mutationFn: (request: ChatbotSettingRequest) => patchChatbotSetting(request),
    onSuccess: (data) => {
      if (data) {
        setLeapyType(data.chatbotType);
        handleNext();
      }
    },
  });
};
