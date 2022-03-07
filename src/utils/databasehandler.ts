import * as mongodb from "mongodb";
import { Config, UpdateMode } from "../model";
require("dotenv").config();

const url: string = process.env.MONGO_QUERY!;
const db: string = process.env.MONGO_DBNAME!;

const client = new mongodb.MongoClient(url);

export async function getConfig(): Promise<Config> {
    return client.db(db).collection("config").findOne({ id: "1" })! as unknown as Config;
}

export async function updateConfig<K extends keyof Omit<Config, "id">>(prop: K, value: Config[K], mode: UpdateMode<Config[K]> = "$set"): Promise<void> {
    let dbQuery = { [mode]: { [prop]: value } };

    client.db(db).collection("config").updateOne({ id: "1" }, dbQuery, err => {
        if (err) throw err;
    });
}

export async function connectToDB(): Promise<void> {
    return new Promise(resolve => {
        client.connect(async err => {
            if (err) throw err;
            console.log("Successfully connected to " + db);
            //["users", "config"].forEach(el => client.db(db).createCollection(el));
            resolve();
        });
    });
}