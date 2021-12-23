import styles from "../styles/NextLevel.module.css";

type Props = {
  level: number;
  minutes: number;
  seconds: number;
  score: number;
};

const NextLevel: React.FC<Props> = ({ level, minutes, seconds, score }) => {
  const roundBonus = level * 10;
  const timeBonus = minutes ? minutes * 60 + seconds : seconds;
  return (
    <>
      <p className={styles.text}>Round Bonus: {roundBonus}</p>
      <p className={styles.text}>
        Time remaining: 0{minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </p>
      <p className={styles.text}>Time bonus: {timeBonus}</p>
      <p className={styles.text}>Current Score: {score}</p>
    </>
  );
};

export default NextLevel;
