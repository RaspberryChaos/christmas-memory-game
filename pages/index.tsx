import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Icon from "../components/Icon";
import Panel from "../components/Panel";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <section className="container">
      <Panel title="Christmas Memory Game">
        <div className={styles.playBtnContainer}>
          <a href="/game">
            <Image
              src={"/imgs/buttons/play.png"}
              width="120"
              height="120"
              layout="intrinsic"
              priority={true}
            />
          </a>
        </div>
        <div className={styles.iconContainer}>
          <Icon src="/imgs/buttons/help.png" link="/help"/>
          <Icon src="/imgs/buttons/highScore.png" />
          <Icon src="/imgs/buttons/sound-off.png" />
        </div>
      </Panel>
    </section>
  );
};

export default Home;
