import { Client, Message } from "discord.js";
import { Command, Config } from "../model";
import { getConfig } from "../utils/databasehandler";

export async function messageEvent(client: Client, message: Message) {
    const config: Config = await getConfig();
    if (message.author.bot || !message.content.startsWith(config.prefix) || !message.guild) {
        return;
    }
    let command = message.content.split(' ')[0].slice(config.prefix.length).toLowerCase();
    if (!command) {
        return;
    }
    let params = message.content.split(' ').slice(1),
        perms: number = await client.elevate(message),
        cmd: Command | null = null;

    if (client.commands.has(command)) {
        cmd = client.commands.get(command)!;
    } else if (client.aliases.has(command)) {
        cmd = client.aliases.get(command)!;
    }

    if (!cmd || perms < cmd.config.permLevel) {
        return;
    }

    try {
        cmd.run(client, message, params);
    } catch (e) {
        console.log(`[${new Date(Date.now())}] Error: ${e}`);
    }
}