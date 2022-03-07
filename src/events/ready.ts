import { Client } from "discord.js";

export async function readyEvent(client: Client, status: string) {
    //wait 2 seconds to sync with API
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
}