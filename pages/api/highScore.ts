import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const data = req.body;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASS;

    let client;

    try {
      client = await MongoClient.connect(
        `mongodb+srv://${user}:${password}@cluster0.ms32h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    let db = client.db();

    try {
      const result = await db.collection("highScores").insertOne(data);
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Failed to add score" });
      return;
    }

    client.close();
    res.status(201).json({ message: "High score added!" });
  }
}

export default handler;
