import {
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType,
} from 'discord.js';

const thoughts = ["Mom, life is a wilderness.",
    "🌼",
    "What's with the cooold weather all of a sudden. I'm not afraid of it, I have lots of furrrr, but what about the hairless little human monkeys?",
    "Adventure? That's for little dogs, big dogs like me need ...... a break.",
    "Good morning! I hope all the kittens and puppies and critters are happy, no matter on earth or in the sky.",
    "The important thing is to dare to fight.",
    "Food is IMPORTANT."]

export const data = new SlashCommandBuilder()
    .setName('philosophy')
    .setDescription('Bernease Mountain Dog is thinking.');

// Execute function export
export async function execute(interaction) {
    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    await interaction.reply(randomThought);
}