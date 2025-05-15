import { useMutation } from "@tanstack/react-query";
import { chat } from "@shared/apis/chat.ts";
import { LeapyRequest } from "@shared/types/request/chat.ts";
import { useChatStore } from "@chat/feature/store/useChatStore.ts";

export const usePostChat = () => {
  const { addMessage } = useChatStore();
  return useMutation({
    mutationFn: (data: LeapyRequest) => chat(data),
    onSuccess: (data) => {
      if (data) {
        const botReply = { content: data?.reply, isUser: false };
        addMessage(botReply);
      }
    },
  })
}
