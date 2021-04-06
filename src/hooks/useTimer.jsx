import React, { useEffect, useState } from 'react';

export const useTimer = (seconds, answerSelected) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  useEffect(() => {
    if (!timeLeft || answerSelected) return undefined;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [timeLeft, answerSelected]);

  return timeLeft;
};
