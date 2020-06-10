import React, { useEffect, useRef } from 'react';

interface Props {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  sessionLength: number;
  setSessionLength: React.Dispatch<React.SetStateAction<number>>;
  breakLength: number;
  setBreakLength: React.Dispatch<React.SetStateAction<number>>;
  setSessionSwitchCount: React.Dispatch<React.SetStateAction<number>>;
  setBreakTransition: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SetCount: React.FC<Props> = ({
  setPlay,
  setSeconds,
  setMinutes,
  sessionLength,
  setSessionLength,
  breakLength,
  setBreakLength,
  setSessionSwitchCount,
  setBreakTransition,
}) => {
  const increment = (num: number): number => {
    if (num === 60) return num;
    return num + 1;
  };
  const decrement = (num: number): number => {
    if (num === 1) return num;
    return num - 1;
  };

  // calculate minutes
  const prevSessionLengthRef = useRef<number>();
  const prevBreakLengthRef = useRef<number>();
  useEffect(() => {
    prevSessionLengthRef.current = sessionLength;
    prevBreakLengthRef.current = breakLength;
  });

  if (
    prevSessionLengthRef.current !== sessionLength ||
    prevBreakLengthRef.current !== breakLength
  ) {
    setMinutes(sessionLength);
    setPlay(false);
    setSeconds(0);
    setSessionSwitchCount(1);
    setBreakTransition(false);
  }

  return (
    <div id="count-wrapper">
      <div id="break-label">
        <h4>Break Length</h4>
        <div className="select-wrapper">
          <div
            id="break-increment"
            onClick={(): void => {
              setBreakLength(increment(breakLength));
            }}
            onKeyDown={(): void => {
              setBreakLength(increment(breakLength));
            }}
          >
            <i className="fas fa-arrow-up" />
          </div>
          <div
            id="break-decrement"
            onClick={(): void => {
              setBreakLength(decrement(breakLength));
            }}
            onKeyDown={(): void => {
              setBreakLength(decrement(breakLength));
            }}
          >
            <i className="fas fa-arrow-down" />
          </div>
        </div>
        <p id="break-length">{breakLength}</p>
      </div>
      <div id="session-label">
        <h4>Session Length</h4>
        <div className="select-wrapper">
          <div
            id="session-increment"
            onClick={(): void => {
              setSessionLength(increment(sessionLength));
            }}
            onKeyDown={(): void => {
              setSessionLength(increment(sessionLength));
            }}
          >
            <i className="fas fa-arrow-up" />
          </div>
          <div
            id="session-decrement"
            onClick={(): void => {
              setSessionLength(decrement(sessionLength));
            }}
            onKeyDown={(): void => {
              setSessionLength(decrement(sessionLength));
            }}
          >
            <i className="fas fa-arrow-down" />
          </div>
        </div>
        <p id="session-length">{sessionLength}</p>
      </div>
    </div>
  );
};
