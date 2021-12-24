import Card from "../components/Card";
import Timer from "../components/Timer";
import Icon from "../components/Icon";
import { CardType } from "../levels";
import styles from "../styles/Level.module.css";

interface Props {
  level: number;
  memoryCards: CardType[];
  score: number;
  minutes: number;
  seconds: number;
  handleChoice: (card: CardType) => void;
  cardOne: CardType | null;
  cardTwo: CardType | null;
}

const Level: React.FC<Props> = ({
  level,
  memoryCards,
  score,
  minutes,
  seconds,
  handleChoice,
  cardOne,
  cardTwo,
}) => {
  return (
    <>
      <div className={styles.iconContainer}>
        <Icon src="/imgs/buttons/homeBtn.png" link="/" alt="home button" />
        <Icon src="/imgs/buttons/sound-off.png" alt="sound off button" />
      </div>
      <div className={styles.levelContainer}>
        <h2 className={styles.title}>Level {level}</h2>
        <div>
          <p className={styles.score}>Score: {score}</p>
          <Timer minutes={minutes} seconds={seconds} />
        </div>
        <div
          style={{ display: "grid", gridGap: "15px" }}
          className={
            level === 1
              ? styles.level1
              : level < 5
              ? styles.level2
              : level === 5
              ? styles.level5
              : level === 6
              ? styles.level6
              : level === 7
              ? styles.level7
              : styles.level8
          }
        >
          {memoryCards.map((card, i) => (
            <Card
              card={card}
              key={i}
              handleCardClick={handleChoice}
              clicked={card === cardOne || card === cardTwo || card.matched}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Level;
