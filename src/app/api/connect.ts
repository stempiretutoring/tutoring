import { MongoClient, ServerApiVersion } from "mongodb";

const uri: string = process.env.MONGO_URI || "";

const client: MongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});

export { client }
