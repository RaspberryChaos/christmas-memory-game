import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { MongoClient } from "mongodb";
import Panel from "../components/Panel";
import Icon from "../components/Icon";
import Level from "../components/Level";
import GameOver from "../components/GameOver";
import NextLevel from "../components/NextLevel";
import { cardList, CardType } from "../levels";
import styles from "../styles/Game.module.css";

type Props = {
  minScore: number;
};

const Game: NextPage<Props> = ({ minScore }) => {
  //State
  const [memoryCards, setMemoryCards] = useState<CardType[] | []>([]);
  const [cardOne, setCardOne] = useState<CardType | null>(null);
  const [cardTwo, setCardTwo] = useState<CardType | null>(null);
  const [turns, setTurns] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelComplete, setLevelComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(10);
  const [timeUp, setTimeUp] = useState(false);

  //Shuffle and set first cards
  useEffect(() => {
    shuffleCards();
  }, []);

  //Shuffle cards into random order
  const shuffleCards = (): void => {
    const cards = [...cardList].splice(0, level * 2);
    const shuffled = [...cards, ...cards].sort(
      () => Math.random() - Math.random()
    );
    const array = shuffled.map((el, i) => ({ ...el, id: i }));
    setMemoryCards(array);
  };

  //Handle card click
  const handleChoice = (card: CardType): void => {
    if (card.matched || card === cardOne || cardTwo) return;
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  //Check if cards match when second card is clicked
  useEffect(() => {
    if (cardOne && cardTwo) {
      if (cardOne.name === cardTwo.name) {
        setScore((prev) => prev + 10);
        setMemoryCards((prevCards) =>
          prevCards.map((card) => {
            if (card.name === cardOne.name) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );
        reset();
      } else {
        const timeout = setTimeout(() => {
          reset();
        }, 500);
      }
    }
  }, [cardTwo]);

  //Reset card one and two
  const reset = (): void => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prev) => prev + 1);
  };

  //Check if level is complete
  useEffect(() => {
    if (memoryCards.length > 0) {
      checkWin();
    }
  }, [memoryCards]);

  //Check if level is complete
  const checkWin = (): void => {
    if (memoryCards.length > 0 && memoryCards.every((card) => card.matched)) {
      if (level <= 8) setLevelComplete(true);
      let roundBonus = level * 10;
      let timeBonus = minutes ? minutes * 60 + seconds : seconds;
      setScore((prev) => prev + roundBonus + timeBonus);
    }
  };

  //Set up next level
  useEffect(() => {
    if (level > 1) {
      nextLevel();
    }
  }, [level]);

  //Change level
  const nextLevel = (): void => {
    setLevelComplete(false);
    setCardOne(null);
    setCardTwo(null);
    setTurns(0);
    shuffleCards();
  };

  //Timer

  useEffect(() => {
    const time = level < 4 ? level * 10 : level * 15;
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    setMinutes(mins);
    setSeconds(secs);
  }, [level]);

  useEffect(() => {
    if (levelComplete) return;
    if (seconds === 0 && minutes === 0) {
      setTimeUp(true);
      return;
    }
    const interval =
      seconds > 0
        ? setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000)
        : setInterval(() => {
            setSeconds(59);
            setMinutes((prevMinutes) => prevMinutes - 1);
          }, 1000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [seconds, minutes]);

  //Return

  return (
    <section className="container">
      {!levelComplete && !timeUp && (
        <Level
          level={level}
          memoryCards={memoryCards}
          score={score}
          minutes={minutes}
          seconds={seconds}
          handleChoice={handleChoice}
          cardOne={cardOne}
          cardTwo={cardTwo}
        />
      )}
      {timeUp && (
        <Panel title="You ran out of time!">
          <GameOver score={score} minScore={minScore} />
        </Panel>
      )}
      {levelComplete &&
        (level < 8 ? (
          <Panel title={`Level ${level} Complete!`}>
            <NextLevel
              level={level}
              score={score}
              minutes={minutes}
              seconds={seconds}
            />
            <div
              className={styles.btnContainer}
              onClick={() => setLevel((prev) => prev + 1)}
            >
              <Icon src="/imgs/buttons/play.png" alt="play button" />
            </div>
          </Panel>
        ) : (
          <Panel title="You completed the game!">
            <GameOver score={score} minScore={minScore} />
          </Panel>
        ))}
    </section>
  );
};

export async function getStaticProps() {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;

  let client;
  try {
    client = await MongoClient.connect(
      `mongodb+srv://${user}:${password}@cluster0.ms32h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log("Could not connect to database.");
    return;
  }

  const db = client.db();
  const scoresCollection = db.collection("highScores");

  let scores = await scoresCollection.find().project({score: 1}).toArray();
  scores = scores.sort((a, b) => b.score - a.score).slice(0, 5);
  const minScore = scores[4].score;
  client.close();

  return {
    props: {
      minScore: minScore
    },
    revalidate: 60,
  };
}

export default Game;
