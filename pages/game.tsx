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

  //Shuffle and set first cards
  useEffect(() => {
    shuffleCards();
  }, []);

  //Check if cards match when second card is clicked
  useEffect(() => {
    if (cardOne && cardTwo) {
      if (cardOne.name === cardTwo.name) {
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
    checkWin();
  }, [memoryCards]);

  //Set up next level
  useEffect(() => {
    setLevelComplete(false);
    setCardOne(null);
    setCardTwo(null);
    setTurns(0);
    shuffleCards();
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
    if (memoryCards && memoryCards.every((card) => card.matched)) {
      console.log("Game WON!");
      if (level < 8) setLevelComplete(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Level {level}</h2>
      <div className={styles.cardGrid}>
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
      {levelComplete && (
        <button onClick={() => setLevel((prev) => prev + 1)}>
          Next Level!
        </button>
      )}
    </section>
  );
};

export default Game;
