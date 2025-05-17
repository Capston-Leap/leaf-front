import ImgLeapyMT from "@img/img-leapy-mt.png";
import ImgLeapyMF from "@img/img-man-leafi.png";
import ImgLeapyFF from "@img/img-leapy-ff.png";
import ImgLeapyFT from "@img/img-leapy-ft.png";

export interface LeapyResponse {
  reply: string;
  repliedTime: string;
}

export interface MessageResponse {
  sender: string;
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  id: number;
  responseList: MessageResponse[];
  hasNext: boolean;
}

export const LeapyType: Record<string, string> = {
  "MF": ImgLeapyMF,
  "MT": ImgLeapyMT,
  "FF": ImgLeapyFF,
  "FT": ImgLeapyFT,
}
