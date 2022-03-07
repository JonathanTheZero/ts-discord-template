import { Client, Message } from "discord.js";

export interface Command {
    config: {
        enabled: boolean;
        guildOnly: boolean;
        aliases: string[];
        permLevel: PermLevel; //PermLevel.USER is the derfault
    };
    help: {
        name: string;
        description: string;
        usage: string;
    };
    //Promise<any> indicatesthat it's an async function
    run: (client: Client, message: Message, args: string[]) => Promise<void | Message>;
}


export declare const enum PermLevel {
    USER = 0,
    BAN_MEMBERS = 2,
    MANAGE_MESSAGES = 3,
    ADMINISTRATOR = 4,
    BOT_ADMIN = 5
}
