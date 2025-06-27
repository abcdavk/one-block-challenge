// Shop sellable item list
export const itemSellableRegistry = [
    { id: "minecraft:dirt", price: 1 },
    { id: "minecraft:cobblestone", price: 1 },
    { id: "minecraft:oak_log", price: 2 },
    { id: "minecraft:wheat", price: 3 },
    { id: "minecraft:lapis_lazuli", price: 25 },
    { id: "minecraft:emerald", price: 50 },
    { id: "minecraft:apple", price: 10 },
];
// Shop buyable item list
export const itemBuyableRegistry = [
    { id: "minecraft:bundle", price: 50 },
    { id: "minecraft:experience_bottle", price: 25 },
    { id: "minecraft:totem_of_undying", price: 1000 },
    { id: "minecraft:enchanted_book", price: 600, enchantments: [{ type: "fire_aspect", level: 2 }] },
    { id: "minecraft:enchanted_book", price: 1200, enchantments: [{ type: "silk_touch", level: 1 }] },
    { id: "minecraft:enchanted_book", price: 800, enchantments: [{ type: "looting", level: 3 }] },
    { id: "minecraft:enchanted_book", price: 1000, enchantments: [{ type: "efficiency", level: 5 }] },
    { id: "minecraft:enchanted_book", price: 1500, enchantments: [{ type: "fortune", level: 3 }] },
    { id: "minecraft:enchanted_book", price: 500, enchantments: [{ type: "flame", level: 1 }] },
    { id: "minecraft:enchanted_book", price: 1500, enchantments: [{ type: "infinity", level: 1 }] },
    { id: "minecraft:enchanted_book", price: 1000, enchantments: [{ type: "swift_sneak", level: 2 }] },
    { id: "minecraft:enchanted_book", price: 1500, enchantments: [{ type: "sharpness", level: 5 }] },
    { id: "minecraft:enchanted_book", price: 500, enchantments: [{ type: "knockback", level: 2 }] },
    { id: "minecraft:enchanted_book", price: 600, enchantments: [{ type: "respiration", level: 3 }] },
    { id: "minecraft:enchanted_book", price: 1000, enchantments: [{ type: "feather_falling", level: 4 }] },
    { id: "minecraft:enchanted_book", price: 600, enchantments: [{ type: "fire_protection", level: 4 }] },
    { id: "minecraft:enchanted_book", price: 1500, enchantments: [{ type: "protection", level: 4 }] },
    { id: "dave:dirt_generator", price: 100 },
    { id: "dave:cobblestone_generator", price: 250 },
    { id: "dave:farmland_generator", price: 150 },
    { id: "dave:sand_generator", price: 300 },
    { id: "dave:ender_generator", price: 20000 },
    { id: "dave:cave_generator", price: 450 },
    { id: "dave:iron_generator", price: 600 },
    { id: "dave:wood_generator", price: 350 },
    { id: "dave:diamond_generator", price: 4000 },
    { id: "dave:copper_generator", price: 750 },
    { id: "dave:nether_generator", price: 1500 },
    { id: "dave:gold_generator", price: 1500 },
    { id: "dave:emerald_generator", price: 20000 },
    { id: "dave:lapis_generator", price: 7000 },
    { id: "dave:coal_generator", price: 800 },
    { id: "dave:redstone_generator", price: 750 },
    { id: "dave:dye_generator", price: 500 },
    { id: "dave:ocean_generator", price: 650 },
    { id: "dave:portal_generator", price: 10000 },
];
// Generator settings
export const generatorRegistry = [
    {
        id: "dave:dirt_generator",
        cooldown: 2,
        generate: [
            "minecraft:dirt",
            "minecraft:grass_block",
        ]
    },
    {
        id: "dave:cobblestone_generator",
        cooldown: 2,
        generate: [
            "minecraft:cobblestone",
        ]
    },
    {
        id: "dave:farmland_generator",
        cooldown: 8,
        generate: [
            "minecraft:mangrove_propagule",
            "minecraft:cherry_sapling",
            "minecraft:dark_oak_sapling",
            "minecraft:spruce_sapling",
            "minecraft:oak_sapling",
            "minecraft:wheat_seeds",
            "minecraft:pumpkin_seeds",
            "minecraft:carrot",
            "minecraft:wolf_spawn_egg",
            "minecraft:cow_spawn_egg",
            "minecraft:sheep_spawn_egg",
            "minecraft:sugar_cane",
            "minecraft:birch_sapling",
            "minecraft:glow_berries",
            "minecraft:sweet_berries",
            "minecraft:enchanted_golden_apple",
            "minecraft:pig_spawn_egg",
            "minecraft:iron_golem_spawn_egg",
            "minecraft:potato",
            "minecraft:bamboo",
            "minecraft:water_bucket",
        ]
    },
    {
        id: "dave:sand_generator",
        cooldown: 8,
        generate: [
            "minecraft:sand",
            "minecraft:tnt",
        ]
    },
    {
        id: "dave:cave_generator",
        cooldown: 2,
        generate: [
            "minecraft:gravel",
            "minecraft:granite",
            "minecraft:diorite",
            "minecraft:andesite",
            "minecraft:blackstone",
            "minecraft:deepslate",
            "minecraft:stone",
            "minecraft:clay",
            "minecraft:amethyst_shard",
        ]
    },
    {
        id: "dave:ocean_generator",
        cooldown: 12,
        generate: [
            "minecraft:prismarine_bricks",
            "minecraft:sea_lantern",
            "minecraft:sponge",
            "minecraft:kelp",
        ]
    },
    {
        id: "dave:ender_generator",
        cooldown: 30,
        generate: [
            "minecraft:end_stone",
            "minecraft:chorus_fruit",
            "minecraft:ender_pearl",
            "minecraft:elytra",
            "minecraft:ender_chest",
            "minecraft:undyed_shulker_box",
            "minecraft:firework_rocket",
        ]
    },
    {
        id: "dave:iron_generator",
        cooldown: 10,
        generate: [
            "minecraft:iron_ore",
            "minecraft:iron_ingot",
            "minecraft:raw_iron",
            "minecraft:iron_block",
        ]
    },
    {
        id: "dave:wood_generator",
        cooldown: 3,
        generate: [
            "minecraft:oak_log",
            "minecraft:stick",
            "minecraft:oak_planks",
        ]
    },
    {
        id: "dave:diamond_generator",
        cooldown: 10,
        generate: [
            "minecraft:diamond",
            "minecraft:diamond_ore",
            "minecraft:diamond_block",
        ]
    },
    {
        id: "dave:copper_generator",
        cooldown: 10,
        generate: [
            "minecraft:copper_ingot",
            "minecraft:copper_ore",
            "minecraft:copper_block",
        ]
    },
    {
        id: "dave:nether_generator",
        cooldown: 5,
        generate: [
            "minecraft:glowstone",
            "minecraft:obsidian",
            "minecraft:magma",
            "minecraft:nether_wart",
            "minecraft:soul_soil",
            "minecraft:netherrack",
            "minecraft:lava_bucket",
            "minecraft:netherite_scrap",
            "minecraft:blaze_rod",
        ]
    },
    {
        id: "dave:gold_generator",
        cooldown: 10,
        generate: [
            "minecraft:gold_ingot",
            "minecraft:raw_gold",
            "minecraft:gold_ore",
            "minecraft:gold_block",
        ]
    },
    {
        id: "dave:emerald_generator",
        cooldown: 10,
        generate: [
            "minecraft:emerald",
            "minecraft:emerald_ore",
            "minecraft:emerald_block",
            "minecraft:villager_spawn_egg",
            "minecraft:wandering_trader_spawn_egg",
        ]
    },
    {
        id: "dave:lapis_generator",
        cooldown: 10,
        generate: [
            "minecraft:lapis_lazuli",
            "minecraft:lapis_ore",
            "minecraft:lapis_block",
        ]
    },
    {
        id: "dave:coal_generator",
        cooldown: 10,
        generate: [
            "minecraft:coal",
            "minecraft:coal_ore",
            "minecraft:coal_block",
        ]
    },
    {
        id: "dave:redstone_generator",
        cooldown: 10,
        generate: [
            "minecraft:redstone",
            "minecraft:redstone_block",
        ]
    },
    {
        id: "dave:portal_generator",
        cooldown: 30,
        generate: [
            "minecraft:end_portal_frame",
            "minecraft:ender_eye",
            "minecraft:obsidian",
        ]
    },
    {
        id: "dave:dye_generator",
        cooldown: 5,
        generate: [
            "minecraft:black_dye",
            "minecraft:blue_dye",
            "minecraft:brown_dye",
            "minecraft:cyan_dye",
            "minecraft:gray_dye",
            "minecraft:green_dye",
            "minecraft:light_blue_dye",
            "minecraft:light_gray_dye",
            "minecraft:lime_dye",
            "minecraft:magenta_dye",
            "minecraft:orange_dye",
            "minecraft:pink_dye",
            "minecraft:purple_dye",
            "minecraft:red_dye",
            "minecraft:white_dye",
            "minecraft:yellow_dye",
            "minecraft:flow_armor_trim_smithing_template",
            "minecraft:spire_armor_trim_smithing_template",
            "minecraft:bolt_armor_trim_smithing_template",
            "minecraft:rib_armor_trim_smithing_template",
            "minecraft:silence_armor_trim_smithing_template",
        ]
    },
];
export const oneBlocks = [
    "minecraft:diamond_ore",
    "minecraft:lapis_ore",
    "minecraft:redstone_ore",
    "minecraft:coal_ore",
    "minecraft:copper_ore",
    "minecraft:emerald_ore",
    "minecraft:dirt",
    "minecraft:stone",
    "minecraft:granite",
    "minecraft:diorite",
    "minecraft:andesite",
    "minecraft:iron_ore",
    "minecraft:gold_ore",
    "minecraft:dark_oak_leaves",
    "minecraft:oak_leaves",
    "minecraft:cherry_leaves",
    "minecraft:spruce_leaves",
    "minecraft:birch_leaves",
    "minecraft:cobblestone",
    "minecraft:slime",
    "minecraft:bone_block",
    "minecraft:clay",
    "minecraft:grass_block",
    "minecraft:blackstone",
    "minecraft:deepslate",
    "minecraft:mangrove_log",
    "minecraft:red_sand",
    "minecraft:raw_copper_block",
    "minecraft:raw_iron_block",
    "minecraft:raw_gold_block",
    "minecraft:podzol",
    "minecraft:mycelium",
    "minecraft:grass_path",
    "minecraft:acacia_log",
    "minecraft:white_wool",
    "minecraft:oak_planks",
    "minecraft:spruce_planks",
    "minecraft:dark_oak_planks",
];
