const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  Events
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;

const lists = {
  weapons: `⚔️ **Weapons**
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

  accessories: `🛡️ **Accessories**
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

  consumables: `🧪 **Consumables**
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

  items: `📦 **Items / Materials / Misc**
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

  blocks: `🧱 **Blocks / Furniture**
Hive = Ruins Block
Hive Wall = Ruins Wall
Ash Block = Swamp Soil Block
Chippy's Couch = DIY Couch`,

  fishing: `🎣 **Fishing**
Wood Fishing Pole = Handmade Rod
Reinforced Fishing Pole = Average Rod
Mechanics Rod = Quality Rod
Sitting Ducks Fishing Rod = Premium Rod
Rockfish = Pincer
Swordfish = Swordfish
Purple Clubberfish = Heavenly Sword`,

  bosses: `👑 **Bosses**
King Slime = Grand Slime
Eye of Cthulhu = C6H8O6
Eater of Worlds = Cave Ice Bug
Brain of Cthulhu = Phantom King
Skeletron = Prehistoric Colossus
Queen Bee = Zulan In Ruins
Deerclops = King Snow Ape
Wall of Flesh = ⊿卝⊙ϟ‡ (Lord of Infinite Dark)`,

  bossdrops: `🏆 **Boss Drops**
King Slime Trophy = Grand Slime Trophy
King Slime Relic = Grand Slime Relic
King Slime Boss Bag = Grand Slime Chest

Eater of Worlds Trophy = Cave Ice Bug Trophy
Eater of Worlds Relic = Cave Ice Bug Relic
Eater of Worlds Boss Bag = Cave Ice Bug Chest

Eye of Cthulhu Trophy = C6H8O6 Trophy
Eye of Cthulhu Relic = C6H8O6 Relic
Eye of Cthulhu Boss Bag = C6H8O6 Chest

Brain of Cthulhu Trophy = Phantom King Trophy
Brain of Cthulhu Relic = Phantom King Relic
Brain of Cthulhu Boss Bag = Phantom King Chest

Skeletron Trophy = Prehistoric Colossus Trophy
Skeletron Relic = Prehistoric Colossus Relic
Skeletron Boss Bag = Prehistoric Colossus Chest

Queen Bee Trophy = Zulan In Ruins Trophy
Queen Bee Relic = Zulan In Ruins Relic
Queen Bee Boss Bag = Zulan In Ruins Chest

Deerclops Trophy = King Snow Ape Trophy
Deerclops Relic = King Snow Ape Relic
Deerclops Boss Bag = King Snow Ape Chest

Wall of Flesh Trophy = ⊿卝⊙ϟ‡ (Lord of Infinite Dark) Trophy
Wall of Flesh Relic = ⊿卝⊙ϟ‡ (Lord of Infinite Dark) Relic
Wall of Flesh Boss Bag = ⊿卝⊙ϟ‡ (Lord of Infinite Dark) Chest`,

  enemies: `👾 **Enemies**
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
Demon Eye = C6H8O6 Battery`,

  pets: `🐶 **Pets**
Eater of Worlds Pet = Cave Ice Bug Jr.
Eye of Cthulhu Pet = Mini C6H8O6
Brain of Cthulhu Pet = Small Extra Crown
Skeletron Pet = Prehistoric Colossus Jr.
Chester Pet = Mining Contract
Deerclops Pet = Glacial Pacifier
Queen Bee Pet = Spare Ancient Gears
King Slime Pet = Grand Slime Chunk`,

  mounts: `🐎 **Mounts**
Slimy Saddle = Fortune Bringer
Honeyed Goggles = Ruins Orb
Wall of Flesh Goat Mount = Flaming Carnival`,

  armor: `🪖 **Armor / Vanity**
Ninja Hood = Knight Helmet
Ninja Shirt = Knight Chestplate
Ninja Pants = Knight Leggings
Bee Shirt = Witch Cloak
Bee Hat = Witch Hat
Bee Pants = Witch Stockings
Skeletron Mask = Prehistoric Crown
King Slime Mask = Grand Slime Mask
Deerclops Mask = King Snow Ape Mask
Eye Mask = C6H8O6 Mask
Brain Mask = Extra Crown
Green Cap = Mentor's Cap
Flesh Mask = Dark Shadow`
};

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "menu") {
      const menu = new StringSelectMenuBuilder()
        .setCustomId("select_category")
        .setPlaceholder("Choose a category")
        .addOptions([
          { label: "Weapons", value: "weapons" },
          { label: "Accessories", value: "accessories" },
          { label: "Consumables", value: "consumables" },
          { label: "Items / Materials / Misc", value: "items" },
          { label: "Blocks / Furniture", value: "blocks" },
          { label: "Fishing", value: "fishing" },
          { label: "Bosses", value: "bosses" },
          { label: "Boss Drops", value: "bossdrops" },
          { label: "Enemies", value: "enemies" },
          { label: "Pets", value: "pets" },
          { label: "Mounts", value: "mounts" },
          { label: "Armor / Vanity", value: "armor" }
        ]);

      const row = new ActionRowBuilder().addComponents(menu);

      await interaction.reply({
        content: "**Soulrraria – Rename List**\nChoose a category:",
        components: [row]
      });
    }
  }

  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];

    await interaction.reply({
      content: lists[selected] || "No data found.",
      ephemeral: true
    });
  }
});

client.login(TOKEN);