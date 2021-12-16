import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import styles from "../styles/Game.module.css";

export interface CardType {
  name: string;
  src: string;
  clicked: boolean;
  matched: boolean;
}

const level1: CardType[] = [
  {
    name: "snowman",
    src: "/cardImgs/snowman.png",
    clicked: false,
    matched: false,
  },
  {
    name: "snowman",
    src: "/cardImgs/snowman.png",
    clicked: false,
    matched: false,
  },
  {
    name: "santa",
    src: "/cardImgs/santa.png",
    clicked: false,
    matched: false,
  },
  {
    name: "santa",
    src: "/cardImgs/santa.png",
    clicked: false,
    matched: false,
  },
];

const Game: NextPage = () => {
  const [level, setLevel] = useState<CardType[]>(level1);
  const [cardOne, setCardOne] = useState<CardType | null>(null);
  const [cardTwo, setCardTwo] = useState<CardType | null>(null);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    if (cardOne && cardTwo) {
      checkMatch();
    }
  }, [cardTwo]);

  const handleChoice = (card: CardType) => {
    console.log("Card clicked");
    console.log(card);
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  const checkMatch = () => {
    if (cardOne && cardTwo) {
      cardOne.name === cardTwo.name
        ? console.log("match")
        : console.log("no match");
    }
    setCardOne(null);
    setCardTwo(null);
    setTurns((prev) => prev + 1);
  };

  return (
    <section className={styles.container}>
      <div className={styles.cardGrid}>
        {level.map((card, i) => (
          <Card card={card} key={i} handleCardClick={handleChoice} />
        ))}
      </div>
      {cardOne && <p>Card 1 : {cardOne.name}</p>}
      {cardTwo && <p>Card 2 : {cardTwo.name}</p>}
      <p>Turns: {turns}</p>
    </section>
  );
};

export default Game;
