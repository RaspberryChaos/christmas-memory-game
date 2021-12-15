import type { NextPage } from "next";
import styles from "../styles/Game.module.css";

const level1 = ["snowman", "santa", "snowman", "santa"];

const Game: NextPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.cardGrid}>
        {level1.map((el) => (
          <div className={styles.card}>{el}</div>
        ))}
      </div>
    </section>
  );
};

export default Game;
