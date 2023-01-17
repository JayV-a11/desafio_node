import { MongoClient } from "mongodb";

const uri =
  "mongodb://admin:admin@ac-t5oysxv-shard-00-00.3txdy18.mongodb.net:27017,ac-t5oysxv-shard-00-01.3txdy18.mongodb.net:27017,ac-t5oysxv-shard-00-02.3txdy18.mongodb.net:27017/?ssl=true&replicaSet=atlas-up1hnu-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
const db = client.db("desafio");

export default { client, db };
