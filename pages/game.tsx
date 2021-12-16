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
    name: "santa",
    src: "/cardImgs/santa.png",
    clicked: false,
    matched: false,
  },
];

const Game: NextPage = () => {
  const [memoryCards, setMemoryCards] = useState<CardType[]>([...level1, ...level1]);
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
        ? setMemoryCards(prevCards => prevCards.map(card => {
            if(card.name === cardOne.name) {
                console.log("match")
                return {...card, matched: true};
            } else {
                return card;
            }
        }))
        : console.log("no match");
    }
    setCardOne(null);
    setCardTwo(null);
    setTurns((prev) => prev + 1);
    console.log(memoryCards)
  };

  return (
    <section className={styles.container}>
      <div className={styles.cardGrid}>
        {memoryCards.map((card, i) => (
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
