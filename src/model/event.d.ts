import { Client, Message } from "discord.js";
import { Config } from "./config";

export type ReadyEvent = (client: Client) => Promise<void>;

export type DEvent = (client: Client, message: Message, config: Config) => Promise<void>;