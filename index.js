// === START OF FILE ===
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Events
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;

// 🔹 PUT YOUR FULL DATA HERE (example shown, replace with yours)
const lists = {
  weapons: [
    "Katana = Shovel",
    "Vilethorn = Vine",
    "Musket = Old Sniper Rifle",
    "Zenith = Sky Piercer",
    "Terra Blade = Qinggang Light Sword",
    "Meowmere = Five-Color Pen",
    "Star Wrath = Moo Moo Mallet"
  ],
  accessories: [
    "Band of Starpower = Ring Blue",
    "Band of Regeneration = Ring Red"
  ]
};

// 🔹 Split into pages (fix 2000 char limit)
function paginate(array, size = 5) {
  const pages = [];
  for (let i = 0; i < array.length; i += size) {
    pages.push(array.slice(i, i + size));
  }
  return pages;
}

// 🔹 Embed UI
function createEmbed(category, pageData, page, total) {
  return new EmbedBuilder()
    .setTitle(`📘 ${category.toUpperCase()}`)
    .setDescription(pageData.join("\n"))
    .setFooter({ text: `Page ${page + 1} / ${total}` })
    .setColor(0x00ff99);
}

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {

  // ================= MENU =================
  if (interaction.isChatInputCommand()) {

  // ===== MENU =====
  if (interaction.commandName === "menu") {

    const menu = new StringSelectMenuBuilder()
      .setCustomId("select_category")
      .setPlaceholder("Choose category")
      .addOptions([
        { label: "Weapons", value: "weapons" },
        { label: "Accessories", value: "accessories" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await interaction.reply({
      content: "📂 Select a category:",
      components: [row]
    });
  }

  // ===== SEARCH (FIXED) =====
  if (interaction.commandName === "search") {

    const query = interaction.options.getString("item");

    // 🔹 SAFETY CHECK
    if (!query) {
      return interaction.reply("❌ Please enter something to search.");
    }

    let results = [];

    for (const key in lists) {
      results.push(
        ...lists[key].filter(x =>
          x.toLowerCase().includes(query.toLowerCase())
        )
      );
    }

    if (results.length === 0) {
      return interaction.reply(`❌ No results for "${query}"`);
    }

    const embed = new EmbedBuilder()
      .setTitle(`🔍 Results for "${query}"`)
      .setDescription(results.join("\n").slice(0, 4000)) // avoid limit
      .setColor(0x0099ff);

    await interaction.reply({ embeds: [embed] });
  }
}
});

client.login(TOKEN);
// === END OF FILE ===