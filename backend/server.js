const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGO_URL || "mongodb://mongodb:27017";
const client = new MongoClient(mongoUrl);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/messages", async (req, res) => {
  try {
    await client.connect();

    const database = client.db("sampledb");
    const collection = database.collection("messages");

    const message = {
      text: "Hello from backend and MongoDB",
      createdAt: new Date()
    };

    await collection.insertOne(message);

    const count = await collection.countDocuments();

    res.json({
      message: message.text,
      savedMessages: count
    });
  } catch (error) {
    res.status(500).json({
      error: "Database connection failed",
      details: error.message
    });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend running on port ${port}`);
});