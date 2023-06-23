import * as path from "path";
import { existsSync } from "fs";
import * as fsPromises from "fs/promises";

const PATH = path.join("db.json");

const hasExistingDb = (): boolean => {
  return existsSync(PATH);
};

const recoverDb = async (): Promise<any> => {
  const buffer = await fsPromises.readFile(PATH);
  return JSON.parse(buffer.toString());
};

const storeDb = async (db: Object): Promise<void> => {
  const t = await fsPromises.writeFile(PATH, Buffer.from(JSON.stringify(db)));
};

export { hasExistingDb, recoverDb, storeDb };
