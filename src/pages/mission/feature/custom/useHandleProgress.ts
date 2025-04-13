import { useEffect, useState } from "react";

export const useHandleProgress = (value: number) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [phase, setPhase] = useState<'up' | 'down' | 'target'>('up'); // 애니메이션 단계 관리

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (phase === 'up') {
      interval = setInterval(() => {
        setCurrentValue((prevValue) => {
          if (prevValue >= 100) {
            setPhase('down');
            return 100;
          }
          return prevValue + 1;
        });
      }, 3);
    } else if (phase === 'down') {
      interval = setInterval(() => {
        setCurrentValue((prevValue) => {
          if (prevValue <= 0) {
            setPhase('target');
            return 0;
          }
          return prevValue - 1;
        });
      }, 5);
    } else if (phase === 'target') {
      interval = setInterval(() => {
        setCurrentValue((prevValue) => {
          if (prevValue >= value) {
            clearInterval(interval);
            return value;
          }
          return prevValue + 1;
        });
      }, 10);
    }

    return () => clearInterval(interval);
  }, [phase, value]);
  return { currentValue };
};
