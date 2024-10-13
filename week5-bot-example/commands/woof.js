import { SlashCommandBuilder } from "discord.js";

// export const data = new SlashCommandBuilder();
// data.setName("woof");
// data.setDescription("This is a woof command");

// export async function execute(interaction) {
//     await interaction.reply("Woof!");
// }

export const data = new SlashCommandBuilder()
    .setName('woof')
    .setDescription('This is a woof command!');

// Execute function export
export async function execute(interaction) {
    await interaction.reply('wooof!');
}