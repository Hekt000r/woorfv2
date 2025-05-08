/***************
 * Index.ts
 * Handles all core logic for the Express server
 ***************/

/* Imports */
import { Application, Response, Request } from "express";
import { Collection } from "mongodb";

const cors = require(`cors`);
const express = require(`express`);
const fs = require(`fs`);
const { MongoClient, ServerApiVersion } = require("mongodb");
require(`dotenv`).config();

/* Variables */

const config = JSON.parse(fs.readFileSync(`./express-config.json`));
const port = config.port;
const app: Application = express();

/* MongoDB stuff */
const uri = `mongodb+srv://hektorzaimidev:${process.env.MONGO_PASSWORD}@cluster0.egfvfvf.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client: typeof MongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

run().catch(console.dir);

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Woorf API index page",
  ); /* When structure is complete, any non /api/* routes will be handled as client-side routing. */
});

app.use(express.json());

/* Get all programs */
app.get("/api/programs", async (req: Request, res: Response) => {
  const db = client.db("woorf-db-1");
  const programsCollection: Collection = await db.collection(`Programs`);
  const programs = await programsCollection.find().toArray();

  res.status(200).send(programs);
});
/* Get all categories */
app.get("/api/categories", async (req: Request, res: Response) => {
  const db = client.db("woorf-db-1");
  const categoriesCollection: Collection = await db.collection(`Categories`);
  const categories = await categoriesCollection.find().toArray();

  res.status(200).send(categories);
});

/* Get specific program */
app.get("/api/program", async (req: Request, res: Response) => {
  const db = client.db("woorf-db-1");
  const programsCollection: Collection = await db.collection(`Programs`);
  const programName = req.query.programName;
  const program = await programsCollection.findOne({ name: programName });
  if (!program) {
    res.status(403).send("Not found");
  }
  res.status(200).send(program);
});

app.post("/api/addDownloadLink", async (req, res: any) => {
  try {
    const db = client.db("woorf-db-1");
    const programsCollection = db.collection("Programs");

    // Extract fields from the request body
    const { progName, label, downloadURL, platform, type } = req.body;
    console.table([progName, label, downloadURL, platform, type]);
    console.log(progName, label, downloadURL, platform, type);
    // Build the new download-link object
    const newLink = { platform, label, downloadURL, type };

    // Push the new link onto the downloadLinks array of the matching program
    const result = await programsCollection.updateOne(
      { name: progName },
      { $push: { downloadLinks: newLink } },
    );

    if (result.matchedCount === 0) {
      // No program found with that name
      return res
        .status(404)
        .json({ message: `Program "${progName}" not found.` });
    }

    // Successfully added
    return res.status(200).json({
      message: "Download link added.",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Error adding download link:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Express server live on port ${port}`);
});
