import { Client, Message } from "discord.js";
import { Command, PermLevel } from "../model";

const ping: Command = {
    config: {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: PermLevel.ADMINISTRATOR
    },
    help: {
        name: "ping",
        description: "Gets the bot's ping (debug purposes only)",
        usage: "!ping"
    },
    async run(client: Client<boolean>, message: Message, args: string[]): Promise<void | Message> {
        const m: Message = await message.reply("Ping?");

        m.edit(
            "Pong!" + 
            `Latency: \`${m.createdTimestamp - message.createdTimestamp}ms\`.\n` +
            `API latency: \`${Math.round(client.ws.ping)}ms\`.`
        );
    }
};


export default ping;
