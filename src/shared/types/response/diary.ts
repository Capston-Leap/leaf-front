import ImgAnger from "@img/img-anger.png";
import ImgDelight from "@img/img-delight.png";
import ImgEmbarrassment from "@img/img-embarrassment.png";
import ImgHurt from "@img/img-hurt.png";
import ImgSorrow from "@img/img-sorrow.png";
import ImgSurprise from "@img/img-surprise.png";
import ImgUnrest from "@img/img-unrest.png";

export interface DiaryCreateResponse {
  diaryId: number;
  daily: string;
  memory: string;
  emotion: string;
  emotionScores: string,
  summary: string;
  message: string;
}

export const EmotionImages: Record<string, string> = {
  "슬픔": ImgSorrow,
  "기쁨": ImgDelight,
  "분노": ImgAnger,
  "당황": ImgEmbarrassment,
  "불안": ImgUnrest,
  "상처": ImgHurt,
  "놀람": ImgSurprise,
}

export interface EmotionScores {
  "슬픔": number;
  "기쁨": number;
  "분노": number;
  "당황": number;
  "불안": number;
  "상처": number;
  "놀람": number;
}

export interface DiaryDetailResponse {
  diaryId: number;
  daily: string;
  memory: string;
  summary: string;
  emotionId: string;
  category: string;
  emotionScores: EmotionScores,
  emoji: string;
}

export interface DiaryListResponse {
  diaryId: number;
  date: string;
  emotionId: number;
  category: string;
  emoji: string;
}
