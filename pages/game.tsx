import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Card from "../components/Card";
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
      console.log("points scored", memoryCards);
      let roundBonus = level * 10;
      setScore((prev) => prev + roundBonus);
      if (level < 8) setLevelComplete(true);
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

  return (
    <section className={styles.container}>
      <h2>Level {level}</h2>
      <div
        style={{ display: "grid", gridGap: "20px" }}
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
      <p>Turns: {turns}</p>
      <p>Score: {score}</p>
      {levelComplete && (
        <button onClick={() => setLevel((prev) => prev + 1)}>
          Next Level!
        </button>
      )}
    </section>
  );
};

export default Game;
