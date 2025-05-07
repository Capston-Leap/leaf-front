import { create } from 'zustand';
import { Message } from "@chat/feature/type/chat.ts";

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
