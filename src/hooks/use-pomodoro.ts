import { useState, useRef, useCallback } from "react";

type UsePomodoroOptions = {
  initialTime?: number;
  onTimeEnd?: () => void;
};

export function usePomodoro({ initialTime = 25 * 60, onTimeEnd }: UsePomodoroOptions) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current!);
            onTimeEnd?.(); // Call the provided callback when time ends
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  }, [isRunning, onTimeEnd]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  return { time, setTime, isRunning, start, pause, reset };
}
