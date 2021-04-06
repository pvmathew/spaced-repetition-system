import React, { useEffect, useState } from 'react';

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  useEffect(() => {
    if (!timeLeft) return undefined;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  return [timeLeft, setTimeLeft];
};
