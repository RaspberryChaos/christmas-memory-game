import { useState, useEffect } from "react";
import styles from "../styles/NextLevel.module.css";

type Props = {
  level: number;
  minutes: number;
  seconds: number;
  score: number;
};

const NextLevel: React.FC<Props> = ({ level, minutes, seconds, score }) => {
  const [delay, setDelay] = useState(0);
  const roundBonus = level * 10;
  const timeBonus = minutes ? minutes * 60 + seconds : seconds;

  useEffect(() => {
    if (delay > 4) return;
    const interval = setInterval(() => {
      setDelay((prev) => prev + 1);
    }, 500);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div className={styles.textContainer}>
      {delay > 0 && <p className={styles.text}>Round Bonus: {roundBonus}</p>}
      {delay > 1 && (
        <p className={styles.text}>
          Time remaining: 0{minutes}:{seconds < 10 ? "0" + seconds : seconds}
        </p>
      )}
      {delay > 2 && <p className={styles.text}>Time bonus: {timeBonus}</p>}
      {delay > 3 && <p className={styles.text}>Current Score: {score}</p>}
    </div>
  );
};

export default NextLevel;
