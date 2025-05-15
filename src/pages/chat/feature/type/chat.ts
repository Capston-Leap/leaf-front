export type Message = {
  content: string;
  isUser: boolean;
};

export interface ChatResponse {
  answer: string;
}
