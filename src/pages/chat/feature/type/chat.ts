export type Message = {
  id: number;
  content: string;
  isUser: boolean;
};

export interface ChatResponse {
  answer: string;
}
