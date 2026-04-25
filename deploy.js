const { REST, Routes, SlashCommandBuilder } = require('discord.js');

// ✅ USE ENV TOKEN (Railway safe)
const TOKEN = process.env.TOKEN;

const CLIENT_ID = "1497429013696872568";
const GUILD_ID = "1475461812022411394";

// ================= COMMANDS =================
const commands = [

  // MENU
  new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Open Soulrraria dropdown menu'),

  // SEARCH (FIXED NAME)
  new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search anything (items, bosses, NPCs, etc.)')
    .addStringOption(option =>
      option.setName('query') // 🔥 CHANGED FROM "item"
        .setDescription('Type anything to search')
        .setRequired(true)
    )

].map(command => command.toJSON());

// ================= REGISTER =================
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registering commands...");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("Commands registered!");
  } catch (error) {
    console.error(error);
  }
})();