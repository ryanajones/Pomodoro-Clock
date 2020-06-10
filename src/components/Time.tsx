import React, { useEffect, useRef } from 'react';

interface Props {
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  sessionLength: number;
  breakLength: number;
  setSessionLength: React.Dispatch<React.SetStateAction<number>>;
  setBreakLength: React.Dispatch<React.SetStateAction<number>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  sessionSwitchCount: number;
  setSessionSwitchCount: React.Dispatch<React.SetStateAction<number>>;
  breakTransition: boolean;
  setBreakTransition: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Time: React.FC<Props> = ({
  play,
  setPlay,
  sessionLength,
  breakLength,
  setSessionLength,
  setBreakLength,
  seconds,
  setSeconds,
  minutes,
  setMinutes,
  sessionSwitchCount,
  setSessionSwitchCount,
}) => {
  const audioEl = useRef<HTMLAudioElement>(null);
  // Time Interval
  useEffect(() => {
    if (play === true) {
      const interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          setSessionSwitchCount(sessionSwitchCount + 1);
        } else if (minutes !== 0 && seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return (): void => clearInterval(interval);
    }
    return undefined;
  });
  const prevSwitchCountRef = useRef<number>();

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      if (audioEl.current !== null) {
        audioEl.current.play();
      }
    }
    prevSwitchCountRef.current = sessionSwitchCount;
  });
  if (prevSwitchCountRef.current !== sessionSwitchCount) {
    if (sessionSwitchCount % 2 === 1) {
      setMinutes(sessionLength);
    } else {
      setMinutes(breakLength);
    }
  }
  // Play pause and reset functions
  const playOrPause = (): void => {
    if (play === true) {
      setPlay(false);
    } else {
      setPlay(true);
    }
  };
  // Reset
  const reset = (): void => {
    setSessionLength(25);
    setBreakLength(5);
    setMinutes(25);
    setSeconds(0);
    setPlay(false);
    setSessionSwitchCount(1);
    const beep = document.querySelector('audio');
    if (beep !== null) {
      beep.pause();
      beep.currentTime = 0;
    }
  };

  return (
    <div id="clock-wrapper">
      <div id="timer-label">
        {sessionSwitchCount % 2 === 1 ? <h4>Session</h4> : <h4>Break</h4>}
      </div>
      <div id="clock-wrapper-two">
        <div id="time-left">
          <p>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </p>
        </div>
        <div id="start-stop-reset">
          <audio id="beep" preload="auto" ref={audioEl}>
            <source src="beep.mp3" type="audio/wav" />
            <track kind="captions" />
          </audio>
          <div id="start_stop" onClick={playOrPause} onKeyDown={playOrPause}>
            <i className="fas fa-play" />
            <i className="fas fa-pause" />
          </div>
          <div id="reset" onClick={reset} onKeyDown={reset}>
            <i className="fas fa-sync" />
          </div>
        </div>
      </div>
    </div>
  );
};
