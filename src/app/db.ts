import { Db, MongoClient, ObjectId } from "mongodb";

const id = new ObjectId(3);
let db: Db;

const initDb = async () => {
  const url = process.env.MONGO_LINK || "";

  const client = new MongoClient(url);
  const dbName = "walk_ein";
  db = client.db(dbName);
};

const hasExistingDb = async (): Promise<boolean> => {
  const data = await db.collection("schedule").findOne(id);
  return !!data;
};

const recoverDb = async (): Promise<any> => {
  const data = await db.collection("schedule").findOne(id);
  return data;
};

const storeDb = async (data: Object): Promise<void> => {
  const exists = await hasExistingDb();
  if (exists) {
    await db.collection("schedule").replaceOne(
      { _id: id },
      {
        _id: id,
        ...data,
      }
    );
  } else {
    await db.collection("schedule").insertOne({
      _id: id,
      ...data,
    });
  }
};

export { initDb, hasExistingDb, recoverDb, storeDb };
