import styles from "../styles/GameWon.module.css";
import Icon from "./Icon";

type Props = {
  score: number;
};

const GameOver: React.FC<Props> = ({ score }) => {
  return (
    <>
      <p className={styles.text}>Final score: {score}</p>
      <div className={styles.iconContainer}>
        <Icon src="/imgs/buttons/homeBtn.png" link="/" alt="home button" />
        <Icon src="/imgs/buttons/highScore.png" link="/highscores" alt="high score table button" />
      </div>
    </>
  );
};

export default GameOver;
