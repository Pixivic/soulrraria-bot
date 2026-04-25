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

// ================= FULL DATA =================
const lists = {
  weapons: `⚔️ Weapons
Katana = Shovel
Vilethorn = Vine
Tentacle Spike = Frost Battleaxe
Musket = Old Sniper Rifle
Ball O Hurt = Deadly Frisbee
The Undertaker = Bad Pistol
The Rotted Fork = Knight Spear
Crimson Rod = Short Staff of Valiant Youngster
Book of Skulls = Key of the Faint Star
Water Bolt = Tidal Staff
Bee Gun = Autocannon of the Colossus
Bees Knees = Gearwork Bow
PewMatic Horn = Fantastic Gun
Lucy the Axe = Raw Axe
Laser Rifle = Jumper
Breaker Blade = Sword of Royal Guard
Pwnhammer = Two-Five's Pummeler
Clockwork Assault Rifle = Next-gen SMG
Fire Whip = Whip of the Past
Zenith = Sky Piercer
Terra Blade = Qinggang Light Sword
Meowmere = Five-Color Pen
Star Wrath = Moo Moo Mallet
Influx Waver = Crystal Crab's Katana
The Horseman's Blade = Golden Crab Warhammer
Seedler = Green Onions
Starfury = Zephyr
Bee Keeper = Willowblade
Enchanted Sword = Caliburn
Copper Shortsword = Tao Sword
True Night's Edge = Oathkeeper
True Excalibur = Sword of King Hero
Night's Edge = Oathbreaker
Excalibur = Grand Knight's Sword
Lights Bane = Void Sword
Blood Butcherer = Breath of Hades
Blade of Grass = Emerald Crescent - EX
Muramasa = Molecule Ichimonji
Fiery Greatsword = Deep Dark Blade
Throwing Knife = Wrench
Revolver = Plasma Eagle
Pulse Bow = Crystal Bow
Tin Shortsword = Breeze
Sickle = Midnight Sickle
Gatligator = Gatling Gun`,

  accessories: `🛡️ Accessories
Band of Starpower = Ring Blue
Band of Regeneration = Ring Red
Worm Scarf = Permafrost Amulet
EoC Shield = C6H8O6 Shield
Brain of Confusion = Phantom Cloak
Panic Necklace = Ominous Pill
Bone Glove = Tactical Banana
Hive Backpack = Gearwork Energy Pack
Ranger Emblem = Elf Buff Bubble
Warrior Emblem = Warrior Buff Bubble
Summoner Emblem = Druid Buff Bubble
Sorcerer Emblem = Witch Buff Bubble
Destroyer Emblem = Stay Focused Buff Bubble
Eye of the Golem = Accuracy Buff Bubble
Avenger Emblem = Hero Valor Buff Bubble
Celestial Emblem = Energy Buff Bubble`,

  consumables: `🧪 Consumables
Lesser Healing Potion = Health Potion
Healing Potion = Health Potion L
Greater Healing Potion = Health Potion XL
Super Healing Potion = Health Potion XXL
Lesser Mana Potion = Mana Potion
Mana Potion = Mana Potion L
Greater Mana Potion = Mana Potion XL
Super Mana Potion = Mana Potion XXL
Jungle Juice = Dumpling
Strange Brew = Strength Potion
Eggnog = Snow Lotus
Restoration Potion = Restoration Potion
Life Crystal = Pill
Life Fruit = Mega Pill
Aegis Crystal = Wine
Aegis Fruit = Coconut Water`,

  items: `📦 Items
Slime Gun = Watering Can
Slime Crown = Organic Matter
Royal Gel = Grand Gel
Shadow Orb = Ice Core
Shadow Scale = Ice Scale
Eaters Bone = Ice Bug Egg
Rotten Chunk = Ice Bug Meat
Worm Food = Pristine Ice Shard
Worm Tooth = Ice bug Tooth
Suspicious Looking Eye = C6H8O6 Calling Kit
Black Lens = C6H8O6 Plugchip
Lens = C6H8O6 Fragment
Binoculars = C6H8O6 Binoculars
Tissue Sample = Phantom Silk
Bloody Spine = Ominous Cross
Bee Wax = Ruins Gear
Honey Comb = Ruins Core
Platinum Coin = Gem
Old Shoe = Gem Fragment
Fishing Seaweed = Rubber Ducky
Tin Can = Coral Pendant
Pho = Dragon Beard Noodle
Peddler's Hat = Mail Guy's Hat
Peddler's Satchel = Mail Box
Clothier Voodoo Doll = Costume Prince's Crown
Guide Voodoo Doll = Mentor Voodoo Doll
Dont Starve Shader Item = Miner's Transmitter
Broken Hero Sword = Broken Hilt`,

  blocks: `🧱 Blocks
Hive = Ruins Block
Hive Wall = Ruins Wall
Ash Block = Swamp Soil Block
Chippy's Couch = DIY Couch`,

  fishing: `🎣 Fishing
Wood Fishing Pole = Handmade Rod
Reinforced Fishing Pole = Average Rod
Mechanics Rod = Quality Rod
Sitting Ducks Fishing Rod = Premium Rod
Rockfish = Pincer
Swordfish = Swordfish
Purple Clubberfish = Heavenly Sword`,

  bosses: `👑 Bosses
King Slime = Grand Slime
Eye of Cthulhu = C6H8O6
Eater of Worlds = Cave Ice Bug
Brain of Cthulhu = Phantom King
Skeletron = Prehistoric Colossus
Queen Bee = Zulan In Ruins
Deerclops = King Snow Ape
Wall of Flesh = ⊿卝⊙ϟ‡ (Lord of Infinite Dark)`,

  enemies: `👾 Enemies
Spiked Slime = Grand Slimeling
Eater of Souls = Ice Bug Larva
Devourer = Ice Bug Scion
Corruptor = Ice Bug Nymph
Creeper = Phantom
Dungeon Guardian = Giant Guard Crab
Bee / Small Bee = Ruins Drone
Wall of Flesh Eye = Tentacle of the Past
The Hungry = Mushroom Baby
The Hungry II = Enraged Mushroom Baby
Leech = Swamp Moss Worm
Servant of Cthulhu = Homing Bullet
Cataract Eye = C6H8O6 Battery
Sleepy Eye = C6H8O6 Battery
Purple Eye = C6H8O6 Battery
Green Eye = C6H8O6 Battery
Dialated Eye = C6H8O6 Battery
Demon Eye Spaceship = C6H8O6 Battery
Demon Eye Owl = C6H8O6 Battery
Demon Eye = C6H8O6 Battery`
};

// ================= HELPERS =================
function parseList(str) {
  return str.split("\n").slice(1);
}

function createEmbed(title, items, page, total) {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(items.join("\n"))
    .setFooter({ text: `Page ${page + 1} / ${total}` })
    .setColor(0x00ff99);
}

// ================= READY =================
client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// ================= INTERACTIONS =================
client.on(Events.InteractionCreate, async interaction => {

  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === "menu") {

      const menu = new StringSelectMenuBuilder()
        .setCustomId("select_category")
        .setPlaceholder("Choose category")
        .addOptions(
          Object.keys(lists).map(key => ({
            label: key.toUpperCase(),
            value: key
          }))
        );

      const row = new ActionRowBuilder().addComponents(menu);

      await interaction.reply({
        content: "**Soulrraria – Rename List**",
        components: [row]
      });
    }

    if (interaction.commandName === "search") {

      const query = interaction.options.getString("item").toLowerCase();

      let results = [];

      for (const category in lists) {
        const items = parseList(lists[category]);

        const matches = items.filter(i =>
          i.toLowerCase().includes(query)
        );

        matches.forEach(m => {
          results.push(`**[${category.toUpperCase()}]** ${m}`);
        });
      }

      if (results.length === 0) {
        return interaction.reply(`❌ No results for "${query}"`);
      }

      const embed = new EmbedBuilder()
        .setTitle(`🔍 Results for "${query}"`)
        .setDescription(results.slice(0, 40).join("\n"))
        .setColor(0x00ffcc);

      await interaction.reply({ embeds: [embed] });
    }
  }

  if (interaction.isStringSelectMenu()) {

    const selected = interaction.values[0];
    const items = parseList(lists[selected]);

    let page = 0;
    const perPage = 10;
    const totalPages = Math.ceil(items.length / perPage);

    const getPage = () => {
      const start = page * perPage;
      return items.slice(start, start + perPage);
    };

    const embed = createEmbed(selected.toUpperCase(), getPage(), page, totalPages);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("prev").setLabel("⬅️").setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId("next").setLabel("➡️").setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true
    });

    const msg = await interaction.fetchReply();

    const collector = msg.createMessageComponentCollector({ time: 60000 });

    collector.on("collect", async i => {

      if (i.customId === "next") page = (page + 1) % totalPages;
      if (i.customId === "prev") page = (page - 1 + totalPages) % totalPages;

      await i.update({
        embeds: [createEmbed(selected.toUpperCase(), getPage(), page, totalPages)]
      });
    });
  }
});

client.login(TOKEN);
// === END OF FILE ===