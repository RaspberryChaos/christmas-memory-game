import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import styles from "../styles/Game.module.css";

export interface CardType {
  name: string;
  src: string;
  matched: boolean;
  id?: number;
}

const level1: CardType[] = [
  {
    name: "snowman",
    src: "/cardImgs/snowman.png",
    matched: false,
  },
  {
    name: "santa",
    src: "/cardImgs/santa.png",
    matched: false,
  },
  { name: "penguin", src: "/cardImgs/penguin.png", matched: false },
  { name: "reindeer", src: "/cardImgs/reindeer.png", matched: false },
  { name: "candyCanes", src: "/cardImgs/candyCanes.png", matched: false },
];

const Game: NextPage = () => {
  const [memoryCards, setMemoryCards] = useState<CardType[]>([
    ...level1,
    ...level1,
  ]);
  const [cardOne, setCardOne] = useState<CardType | null>(null);
  const [cardTwo, setCardTwo] = useState<CardType | null>(null);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    shuffleCards(memoryCards);
  }, []);

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

  const handleChoice = (card: CardType): void => {
    if (card.matched || card === cardOne || cardTwo) return;
    console.log("Card clicked");
    console.log(card);
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  const shuffleCards = (cards: Array<CardType>): void => {
    const shuffled = cards.sort(() => Math.random() - Math.random());
    console.log("shuffled");
    const array = shuffled.map((el, i) => ({ ...el, id: i }));
    setMemoryCards(array);
  };

  const reset = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prev) => prev + 1);
    console.log(memoryCards);
  };

  return (
    <section className={styles.container}>
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
      {/* {cardOne && <p>Card 1 : {cardOne.name}</p>}
      {cardTwo && <p>Card 2 : {cardTwo.name}</p>} */}
      <p>Turns: {turns}</p>
    </section>
  );
};

export default Game;
