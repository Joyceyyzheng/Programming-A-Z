
import * as woof from "./commands/woof.js";
import * as philosophy from "./commands/philosophy.js";
import * as gif from './commands/gif.js';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as fs from 'fs';

config();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

let wordCounts = {
    dog: 0,
    love: 0
};

async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;

    // const { commandName } = interaction;

    if (interaction.commandName === 'woof') {
        await woof.execute(interaction);
    }
    else if (interaction.commandName === 'philosophy') {
        await philosophy.execute(interaction);
    }
    // else if (interaction.commandName === 'gif') {
    //     await gif.execute(interaction);
    // }
}

function readyDiscord() {
    console.log('💖');
}
// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyDiscord);

// Login to Discord with your client's token
client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);


// react the paw print emoji 
client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return; // Ignore bot messages
    if (message.channelId !== '1293610980588392509') return; // Only respond in specific channel
    // console.log("someone sent something")
    // If there are any digits in the message, react with a number emoji
    if (message.content.match(/.*/)) {
        //   console.log("someone sent something")
        message.react('🐾');
        return;
    }
});

//react to woof
client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return; // Ignore bot messages
    if (message.channelId !== '1293610980588392509') return; // Only respond in specific channel

    //listenes to woof
    const woofRegex = /^wo+f$/i;
    const match = message.content.match(woofRegex);

    if (match) {

        const oCount = message.content.match(/o/gi).length; // Count the number of 'o's
        console.info(oCount);
        const response = `w${'o'.repeat(oCount + 1)}f!`;
        message.reply(response);
        return;
    }
    // Respond to a message asking how it makes the user feel
    // message.reply(`How does ${message.content} make you feel?`);
});

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return; // Ignore bot messages
    if (message.channelId !== '1293610980588392509') return; // Only respond in specific channel

    // Count 'dog' and 'love' related words
    const messageContent = message.content.toLowerCase();
    const words = messageContent.split(/\s+/); // Split message into words

    words.forEach(word => {
        if (word.includes('dog')) {
            wordCounts.dog++; // Increment 'dog' count for every occurrence
            message.reply(`Lil human has thought about me ${wordCounts.dog} times. It's getting serious.`);
        }
        if (word.match(/lov(e|ing)/)) {
            wordCounts.love++; // Increment 'love' count for words like 'love', 'loving'
            message.reply(`Lil human has loved me ${wordCounts.love} times 💖 I love you too! `);
        }
    });
    console.log('love:', wordCounts.love, 'dog:', wordCounts.dog);
    //message.reply(`How does ${message.content} make you feel?`);


});




///



//const fs = require("fs"); //old way 
// import * as fs from "fs"; //new way
// import { say } from "cowsay";
// console.log("🐾");

// let output = say({ text: "Hello, World!" });
// console.log(output);