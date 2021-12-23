import type { NextPage } from "next";
import Head from "next/head";
import Icon from "../components/Icon";
import Panel from "../components/Panel";

const HighScores: NextPage = () => {
  return (
    <>
      <Head>
        <title>Christmas Memory Game - High Score Table</title>
      </Head>
      <section className="container">
        <Panel title="High Score Table">
          <p>Coming Soon!</p>
          <div style={{ display: "flex" }}>
            <Icon src="/imgs/buttons/homeBtn.png" link="/" />
            <Icon src="/imgs/buttons/play.png" link="/game" />
          </div>
        </Panel>
      </section>
    </>
  );
};

export default HighScores;
