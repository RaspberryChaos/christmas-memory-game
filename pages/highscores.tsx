import type { NextPage } from "next";
import { MongoClient } from "mongodb";
import Head from "next/head";
import Icon from "../components/Icon";
import Panel from "../components/Panel";

type Score = {
  name: string;
  score: number;
  id: string;
};

interface Props {
  highScores: Score[];
}

const HighScores: NextPage<Props> = ({ highScores }) => {
  return (
    <>
      <Head>
        <title>Christmas Memory Game - High Score Table</title>
      </Head>
      <section className="container">
        <Panel title="High Score Table">
          {highScores.map((score, i) => (
            <p key={i}>
              {i + 1}. {score.name} {score.score}
            </p>
          ))}
          <div style={{ display: "flex" }}>
            <Icon src="/imgs/buttons/homeBtn.png" link="/" alt="home button" />
            <Icon src="/imgs/buttons/play.png" link="/game" alt="play button" />
          </div>
        </Panel>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;

  let client;
  try {
    client = await MongoClient.connect(
      `mongodb+srv://${user}:${password}@cluster0.ms32h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log("Could not connect to database.");
    return;
  }

  const db = client.db();
  const scoresCollection = db.collection("highScores");

  let scores = await scoresCollection.find().toArray();
  scores = scores.sort((a, b) => b.score - a.score).slice(0, 5);
  client.close();

  return {
    props: {
      highScores: scores.map((score) => ({
        name: score.name,
        score: score.score,
        id: score._id.toString(),
      })),
    },
    revalidate: 60,
  };
}

export default HighScores;
