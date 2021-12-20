import { useState, useEffect } from "react";

type Props = {
  level: number;
  levelComplete: boolean;
};

const Timer3: React.FC<Props> = ({ level, levelComplete }) => {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const time = level * 10;
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    setMinutes(mins);
    setSeconds(secs);
  }, [level]);

  useEffect(() => {
    console.log("timer running");
    if ((seconds === 0 && minutes === 0) || levelComplete) return;
    const interval =
      seconds > 0
        ? setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000)
        : setInterval(() => {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }, 1000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [seconds, minutes]);

  return (
    <div>
      <h1>Timer 3</h1>
      <div className="clock">
        <p>0{minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>
      </div>
    </div>
  );
};

export default Timer3;
