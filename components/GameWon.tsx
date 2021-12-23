import styles from "../styles/GameWon.module.css";
import Icon from "../components/Icon";

type Props = {
  score: number;
};

const GameWon: React.FC<Props> = ({ score }) => {
  return (
    <>
      <p className={styles.text}>Final score: {score}</p>
      <div className={styles.iconContainer}>
        <Icon src="/imgs/buttons/homeBtn.png" link="/" />
        <Icon src="/imgs/buttons/highScore.png" link="/highscores" />
      </div>
    </>
  );
};

export default GameWon;
