import { EmotionImages } from "@shared/types/response/diary.ts";

export const toDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// 2. 해당 월 날짜 정보 계산
export const getCalendarCells = (year: number, month: number, recordMap: Record<string, string> ) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const numDays = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay(); // 0 (일) ~ 6 (토)

  const cells: { date?: Date; image?: string }[] = [];

  // 앞 빈 칸 (월~일 시작 정렬)
  const blankCount = (startDayOfWeek + 6) % 7; // 월요일 시작을 0으로 맞춤
  for (let i = 0; i < blankCount; i++) {
    cells.push({});
  }

  for (let day = 1; day <= numDays; day++) {
    const date = new Date(year, month, day);
    const key = toDateKey(date); // ✅ 로컬 기준 날짜
    const category = recordMap[key];
    const image = category ? EmotionImages[category] : undefined;

    cells.push({ date, image });
  }


  return cells;
};
