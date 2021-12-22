import styles from "../styles/Modal.module.css";

type Props = {
  children: React.ReactElement;
  level: number;
  score: number;
  minutes: number;
  seconds: number;
}

const Modal: React.FC<Props> = ({
  children,
  level,
  score,
  minutes,
  seconds,
}) => {
  const roundBonus = level * 10;
  const timeBonus = minutes ? minutes * 60 + seconds : seconds;
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>Level {level} Complete!</h1>
      <p className={styles.text}>Round Bonus: {roundBonus}</p>
      <p className={styles.text}>
        Time remaining: 0{minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </p>
      <p className={styles.text}>Time bonus: {timeBonus}</p>
      <p className={styles.text}>Current Score: {score}</p>
      {children}
    </div>
  );
};

export default Modal;
