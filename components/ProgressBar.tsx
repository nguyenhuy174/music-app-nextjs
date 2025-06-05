// components/Player/ProgressBar.tsx
"use client";

import React from "react";
import Slider from "./Slider";

interface ProgressBarProps {
  duration: number;
  currentTime: number;
  onSeek: (value: number) => void;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, currentTime, onSeek }) => {
  return (
    <div className="flex items-center gap-x-4 w-full px-6">
      <span className="text-xs text-cyan-300 w-[40px]">{formatTime(currentTime)}</span>
      <Slider
        value={currentTime}
        min={0}
        max={duration}
        step={1}
        onChange={(value) => onSeek(value)}
      />
      <span className="text-xs text-cyan-300 w-[40px] text-right">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
