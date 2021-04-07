import React, { useEffect, useState } from 'react';

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [paused, setPaused] = useState(false);

  const pause = () => setPaused(true);
  const unpause = () => setPaused(false);

  useEffect(() => {
    if (!timeLeft || paused) return undefined;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [timeLeft, paused]);

  return [timeLeft, setTimeLeft, pause, unpause];
};
