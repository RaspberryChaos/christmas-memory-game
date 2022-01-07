import type { NextPage } from "next";
import Head from "next/head";
import Icon from "../components/Icon";
import IconContainer from "../components/IconContainer";
import Panel from "../components/Panel";
import styles from "../styles/Help.module.css";

const Help: NextPage = () => {
  return (
    <>
      <Head>
        <title>Christmas Memory Game - How to Play</title>
      </Head>
      <section className="container">
        <Panel title="How to Play">
          <p className={styles.text}>
            Start the game by clicking a card to flip it over and see the image.
            Then try to find another card with the same image to match a pair.
            If the cards match the images will remain visible, if they do not
            match they will be flipped over again and the images hidden. Match
            all the pairs within the time limit to complete the level! Earn
            points for matching the pairs, and bonus points for each level
            completed and any time remaining.
          </p>
          <IconContainer>
            <Icon src="/imgs/buttons/back.png" link="/" alt="back button"/>
            <Icon src="/imgs/buttons/play.png" link="/game" alt="play button" />
          </IconContainer>
        </Panel>
      </section>
    </>
  );
};

export default Help;
