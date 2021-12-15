import type { NextPage } from "next";
import { useState } from "react";
import Card from "../components/Card";
import styles from "../styles/Game.module.css";
import Image from "next/image";


export interface CardType { 
    name: string;
    src: string;
    clicked: boolean;
    matched: boolean;
}

const level1:CardType[] = [{
    name: "snowman",
    src: "/cardImgs/snowman.png",
    clicked: false,
    matched: false
},
{
    name: "snowman",
    src: "/cardImgs/snowman.png",
    clicked: false,
    matched: false
},
{
    name: "santa",
    src: "/cardImgs/santa.png",
    clicked: false,
    matched: false
},
{
    name: "santa",
    src: "/cardImgs/santa.png",
    clicked: false,
    matched: false
}
]


const Game: NextPage = () => {
    const [level, setLevel] = useState(level1);

    const handleChoice = (card: CardType) => {
        console.log("Card clicked");
        console.log(card)
    }

  return (
    <section className={styles.container}>
      <div className={styles.cardGrid}>
        {level.map((card,i) => (
          <Card card={card} key={i} handleCardClick={handleChoice}/>
        ))}
      </div>
    </section>
  );
};

export default Game;
