import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

if (typeof global._mongoClientPromise === "undefined") {
  global._mongoClientPromise = new MongoClient(uri, options).connect();
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
