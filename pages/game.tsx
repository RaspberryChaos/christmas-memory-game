import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Timer from "../components/Timer";
import Panel from "../components/Panel";
import Icon from "../components/Icon";
import Level from "../components/Level";
import GameWon from "../components/GameWon";
import NextLevel from "../components/NextLevel";
import { cardList, CardType } from "../levels";
import styles from "../styles/Game.module.css";

const Game: NextPage = () => {
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

  //Shuffle and set first cards
  useEffect(() => {
    shuffleCards();
  }, []);

  //Check if cards match when second card is clicked
  useEffect(() => {
    if (cardOne && cardTwo) {
      if (cardOne.name === cardTwo.name) {
        setScore((prev) => prev + 10);
        setMemoryCards((prevCards) =>
          prevCards.map((card) => {
            if (card.name === cardOne.name) {
              console.log("match");
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
          console.log("checking match");
        }, 600);
      }
    }
  }, [cardTwo]);

  //Check if level is complete
  useEffect(() => {
    if (memoryCards.length > 0) {
      checkWin();
    }
  }, [memoryCards]);

  //Set up next level
  useEffect(() => {
    if (level > 1) {
      nextLevel();
    }
  }, [level]);

  //Handle card click
  const handleChoice = (card: CardType): void => {
    if (card.matched || card === cardOne || cardTwo) return;
    console.log("Card clicked");
    console.log(card);
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  //Shuffle cards into random order
  const shuffleCards = (): void => {
    const cards = [...cardList].splice(0, level * 2);
    const shuffled = [...cards, ...cards].sort(
      () => Math.random() - Math.random()
    );
    console.log("shuffled", [shuffled]);
    console.log("level", level);
    const array = shuffled.map((el, i) => ({ ...el, id: i }));
    setMemoryCards(array);
  };

  //Reset card one and two
  const reset = (): void => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prev) => prev + 1);
  };

  //Check if level is complete
  const checkWin = (): void => {
    console.log("check win?");
    if (memoryCards.length > 0 && memoryCards.every((card) => card.matched)) {
      console.log("Game WON!");
      console.log("Time remaining:" + minutes + seconds);
      console.log("points scored", memoryCards);
      if (level < 8) setLevelComplete(true);
      let roundBonus = level * 10;
      let timeBonus = minutes ? minutes * 60 + seconds : seconds;
      setScore((prev) => prev + roundBonus + timeBonus);
    }
  };

  //Change level
  const nextLevel = (): void => {
    console.log("next level");
    setLevelComplete(false);
    setCardOne(null);
    setCardTwo(null);
    setTurns(0);
    shuffleCards();
  };

  //Timer

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
    <section className="container">
      {!levelComplete && (
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
      {levelComplete &&
        (level < 3 ? (
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
              <Icon src="/imgs/buttons/play.png" />
            </div>
          </Panel>
        ) : (
          <Panel title="You completed the game!">
            <GameWon score={score} />
          </Panel>
        ))}
    </section>
  );
};

export default Game;
