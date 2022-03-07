# TypeScript Discord Bot Tempalte

This repository serves as a personal template for my Discord bots.
They are coded using the Discord.js API and TypeScript.

1. [Prerequisites](#Prerequisites)
2. [Project structure](#Project-structure)
   1. [Commands](#commands)
   2. [Events](#events)
   3. [Utils](#utils)
3. [Conclusion](#conclusion)

## Prerequisites

You only need Node.js installed, although I recommend installing TypeScript globally using `npm i typescript -g` for easier usability but keep in mind that I am a TypeScript dev.
This decision is purely personal preference.

All the needed dependencies are saved in the `package.json` file, simply type `npm i` in the command line while in this directory and you are ready to go.

## Project structure

### Commands

All commands can be found in `/src/commands/` but there are a few limitations:

- All commands must follow the `Command` interface defined in `src/model/command.d.ts`.
- Only one command per file - the object must be exported as default.
- All other properties should be self explainatory.
  The permission levels that need to be defined can be found in the very same file as the `Command interface`.

All Commands will be automatically included via the file system and called via the `messageEvent` defined in `/src/events/message.ts`.
This leads us to the next chapter, Events:

### Events

Events follow a similiar patterns as the Commands.
However, they are defined as functions rather than objects as I saw no point in generalizing the pattern behind them.
Their use cases are all unique.

### Utils

The Utils folder only contains the database connector as of right now.
This template project works with a MongoDB environment.
It is possible to work with an SQL Database as well, you would only need to modify the `/src/utils/databasehandler.ts` file.

The connection data should be saved in a`.env` file, located directly in `/src/`.


## Conclusion

This project is licensed under the MIT License so feel free to fork, adapt and modify this project to your own needs. 
Although I doubt it will be of much use to anyone besides me ;)