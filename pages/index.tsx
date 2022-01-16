import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "../components/Icon";
import Panel from "../components/Panel";
import styles from "../styles/Home.module.css";

interface Props {
  toggleMusic: () => void;
  music: boolean;
}

const Home: NextPage<Props> = ({ toggleMusic, music, children }) => {
  return (
    <section className="container">
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
                className="global-icon"
              />
            </a>
          </Link>
        </div>
        <div className={styles.iconContainer}>
          <Icon src="/imgs/buttons/help.png" link="/help" alt="help button" />
          <Icon
            src="/imgs/buttons/highScore.png"
            link="/highscores"
            alt="high score table button"
          />
          {music ? (
            <Icon
              src="/imgs/buttons/sound-off.png"
              alt="sound-off button"
              toggleMusic={toggleMusic}
            />
          ) : (
            <Icon
              src="/imgs/buttons/sound-on.png"
              alt="sound-on button"
              toggleMusic={toggleMusic}
            />
          )}
        </div>
      </Panel>
    </section>
  );
};

export default Home;
