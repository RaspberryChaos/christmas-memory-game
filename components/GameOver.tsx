import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Icon from "./Icon";
import styles from "../styles/GameOver.module.css";

type Props = {
  score: number;
  minScore: number;
};

const GameOver: React.FC<Props> = ({ score, minScore }) => {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    let nameAdded = target ? target.value : "???";
    setName(nameAdded);
  };

  const handleAddHighScore = (name: string, score: number) => {
    fetch("/api/highScore", {
      method: "POST",
      body: JSON.stringify({ name: name, score: score, date: new Date() }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) router.push("/highscores");
    });
  };

  useEffect(() => {
    // Prefetch the high score page
    router.prefetch("/highscores");
  }, []);

  return (
    <>
      <p className={styles.text}>Final score: {score}</p>
      {score > minScore ? (
        <>
          <p className={styles.text}>Congratulations, you got a high score!</p>
          <div className={styles.inputDiv}>
            <input
              placeholder="Enter your name"
              onChange={handleNameInput}
              className={styles.input}
            />

            <button
              className={styles.btnSubmit}
              onClick={(e) => handleAddHighScore(name, score)}
            >
              Submit
            </button>
          </div>
        </>
      ) : null}
      <div className={styles.iconContainer}>
        <Icon src="/imgs/buttons/homeBtn.png" link="/" alt="home button" />
        <Icon
          src="/imgs/buttons/highScore.png"
          link="/highscores"
          alt="high score table button"
        />
      </div>
    </>
  );
};

export default GameOver;
