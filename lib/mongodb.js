import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/todos";

// Reaproveita a conexão entre requisições (e entre hot reloads em dev).
let clientPromise = globalThis._mongoClientPromise;
if (!clientPromise) {
  clientPromise = new MongoClient(uri).connect();
  globalThis._mongoClientPromise = clientPromise;
}

export async function getTodosCollection() {
  const client = await clientPromise;
  return client.db().collection("todos");
}
