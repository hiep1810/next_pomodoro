import { useState, useRef, useCallback } from 'react'

export function usePomodoro(initialTime: number = 25 * 60) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true)
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current!)
            setIsRunning(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
  }, [isRunning])

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      setIsRunning(false)
    }
  }, [])

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTime(initialTime)
    setIsRunning(false)
  }, [initialTime])

  return { time, setTime, isRunning, start, pause, reset }
}

