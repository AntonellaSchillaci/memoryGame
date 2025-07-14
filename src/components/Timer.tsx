import React, { useEffect, useState } from 'react';
import './timer.scss'; 

interface TimerProps {
  isActive: boolean;
  isPaused?: boolean;
  resetTrigger: number;
  onTimeUpdate?: (seconds: number) => void;
}

const Timer: React.FC<TimerProps> = ({ isActive, isPaused=false, resetTrigger, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0); 
  }, [resetTrigger]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const newTime = prev + 1;
          if(onTimeUpdate) onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, onTimeUpdate]);

  const getTimeClass = () => {
    if(isPaused) return 'paused';
    if (seconds >= 60) return 'critical';
    if (seconds >= 30) return 'warning';
    return 'timer normal';
  };

  return (
    <span className={`timer ${getTimeClass()} ${!isActive ? 'paused' : ''}`}>
      {seconds}s
    </span>
  );
};

export default Timer;
