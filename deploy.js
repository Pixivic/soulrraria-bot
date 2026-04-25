const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1497429013696872568";
const GUILD_ID = "1475461812022411394";

const commands = [
  new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Open Soulrraria dropdown menu')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log("Registering command...");
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("Command registered!");
  } catch (error) {
    console.error(error);
  }
})();