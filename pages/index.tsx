import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Icon from "../components/Icon";
import Panel from "../components/Panel";
import MusicPlayer from "../components/MusicPlayer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <section className="container">
      {/* <MusicPlayer /> */}
      <Panel title="Christmas Memory Game">
        <div className={styles.playBtnContainer}>
          <Link href="/game" passHref>
            <a>
            <Image
              src={"/imgs/buttons/play.png"}
              width="120"
              height="120"
              layout="intrinsic"
              priority={true}
              alt="play button"
            />
            </a>
          </Link>
        </div>
        <div className={styles.iconContainer}>
          <Icon src="/imgs/buttons/help.png" link="/help"alt="help button"/>
          <Icon src="/imgs/buttons/highScore.png" link="/highscores" alt="high score table button" />
          <Icon src="/imgs/buttons/sound-off.png" alt="sound-off button" />
        </div>
      </Panel>
    </section>
  );
};

export default Home;
