import { useState } from "react";

export const useControlDate = () => {
  const todayMonth = new Date().getMonth();
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(todayMonth); // 12월 (0-indexed)

  const minusOneMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }

  const plusOneMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  return { year, month, minusOneMonth, plusOneMonth };
}
