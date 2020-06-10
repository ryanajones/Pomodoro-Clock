import React, { useEffect, useState } from 'react';
import { SetCount } from './components/SetCount';
import { Time } from './components/Time';
import './scss/main.scss';

const App: React.FC = () => {
  // Button click visual effect
  useEffect(() => {
    const buttonClick = (e: Event): void => {
      const el = e.target as HTMLInputElement;
      el.classList.add('button-effect');
      setTimeout(() => {
        el.classList.remove('button-effect');
      }, 100);
    };
    const buttonElements = document.querySelectorAll('.fas');
    buttonElements.forEach((key) => {
      key.addEventListener('click', buttonClick);
    });
    return (): void => {
      buttonElements.forEach((key) => {
        key.removeEventListener('click', buttonClick);
      });
    };
  });
  // State management
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [breakLength, setBreakLength] = useState<number>(5);
  const [minutes, setMinutes] = useState<number>(sessionLength);
  const [seconds, setSeconds] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [sessionSwitchCount, setSessionSwitchCount] = useState<number>(1);
  const [breakTransition, setBreakTransition] = useState<boolean>(false);

  return (
    <div id="app">
      <h1>Pomodoro Clock</h1>
      <div id="clock-container">
        <SetCount
          setPlay={setPlay}
          setSeconds={setSeconds}
          setMinutes={setMinutes}
          sessionLength={sessionLength}
          setSessionLength={setSessionLength}
          breakLength={breakLength}
          setBreakLength={setBreakLength}
          setBreakTransition={setBreakTransition}
          setSessionSwitchCount={setSessionSwitchCount}
        />
        <Time
          play={play}
          setPlay={setPlay}
          sessionLength={sessionLength}
          setSessionLength={setSessionLength}
          breakLength={breakLength}
          setBreakLength={setBreakLength}
          seconds={seconds}
          setSeconds={setSeconds}
          minutes={minutes}
          setMinutes={setMinutes}
          breakTransition={breakTransition}
          setBreakTransition={setBreakTransition}
          sessionSwitchCount={sessionSwitchCount}
          setSessionSwitchCount={setSessionSwitchCount}
        />
      </div>
    </div>
  );
};

export default App;
