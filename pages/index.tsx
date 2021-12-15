import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.panel}>
      <h1 className={styles.title}>Christmas Memory Game</h1>
      <a href="/game">
        <button>Play Game!</button>
      </a>
      </div>
    </section>
  );
};

export default Home;
