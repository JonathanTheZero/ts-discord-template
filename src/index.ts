import { Client, Collection, Intents, Message, TextChannel } from "discord.js";
import fs from "fs";
import { connectToDB, getConfig } from "./utils/databasehandler";
import { readyEvent, messageEvent, guildMemberAddEvent, guildMemberRemoveEvent, inviteCreateEvent } from "./events";
import { Command, PermLevel } from "./model";
require('dotenv').config();


/*
Setup for deploying the bot
*/
import express from 'express';
import http from 'http';
const app = express();
app.use(express.static('public'));
var _server = http.createServer(app);
//@ts-ignore
const listener: http.Server = app.listen(process.env.PORT, () => console.log('Your app is listening on port ' + listener?.address()?.port));


/*
Connecting to the Database and logging the bot in
*/
const client: Client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

connectToDB()
    .then(getConfig)
    .then(config => {
        client.login(config.token);
        /*
        Reacting to different events
        */
        client.on('ready', client => readyEvent(client, config.status || "NANO"));
        client.on('messageCreate', message => messageEvent(client, message));
        client.on('guildMemberAdd', member => guildMemberAddEvent(client, member));
        client.on('guildMemberRemove', member => guildMemberRemoveEvent(client, member));
        client.on("inviteCreate", inviteCreateEvent);
    });

/*
Loading commands
*/
fs.readdir("./commands/", (err, files) => {
    client.commands = new Collection<string, Command>();
    client.aliases = new Collection<string, Command>();
    if (err) {
        console.error(err);
    }
    files.forEach(f => {
        let cmd = require(`./commands/${f}`).default as Command;
        if (!cmd.config.enabled) {
            return;
        }
        console.log(`Loaded Command: ${cmd.help.name}.`);
        client.commands.set(cmd.help.name, cmd);
        cmd.config.aliases.forEach(alias => {
            client.aliases.set(alias, cmd);
        });
    });
});

client.elevate = async (message: Message): Promise<PermLevel> => {
    if (!message.guild) {
        return -1;
    }
    if ((await getConfig()).admins.includes(message.author.id) || message.member?.roles.cache.find(role => role.name === "Admin")) return PermLevel.BOT_ADMIN;
    if (message.member?.permissions.has("ADMINISTRATOR") || message.member?.roles.cache.find(e => e.name.toLowerCase().includes("team"))) return PermLevel.ADMINISTRATOR;
    if (message.member?.permissions.has("MANAGE_MESSAGES")) return PermLevel.MANAGE_MESSAGES;
    if (message.member?.permissions.has("BAN_MEMBERS")) return PermLevel.BAN_MEMBERS;
    return PermLevel.USER;
}


/*
Error handling section
*/
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on("warn", e => console.log(e.replace(regToken, "that was redacted")));

client.on("error", e => console.log(e.message.replace(regToken, "that was redacted")));

process.on('unhandledRejection', error => console.log('Unhandled promise rejection:', error));
