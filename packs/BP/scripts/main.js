import { EntityComponentTypes, ItemStack, system, world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { convertTypeIdToAuxIcon, itemTypeIdToName, truncateWithDots } from "./utils";
import { generatorRegistry, itemBuyableRegistry, itemSellableRegistry, oneBlocks } from "./config";
import { Money, moneySetup, playerSendMoney } from "./money";
system.afterEvents.scriptEventReceive.subscribe((data) => {
    const { id, message, sourceEntity: player } = data;
    if (id === "ess:money") {
        playerSendMoney(player);
    }
});
world.afterEvents.worldLoad.subscribe(() => {
    moneySetup();
});
world.afterEvents.playerSpawn.subscribe(({ player }) => {
    system.runTimeout(() => {
        console.log("generating one block");
        if (!player.hasTag("ess:hasSetup")) {
            new Money().init(player.nameTag);
            player.addTag("ess:hasSetup");
            player.teleport({
                x: 0.5,
                y: 64,
                z: 0.5
            });
            player.setSpawnPoint({ dimension: world.getDimension("overworld"), x: 0.5, y: 64, z: 0.5 });
        }
        if (!world.getDynamicProperty("ess:worldSetup")) {
            const dimension = world.getDimension("overworld");
            dimension.setBlockType({ x: 0, y: 62, z: 0 }, "minecraft:bedrock");
            dimension.setBlockType({ x: 0, y: 63, z: 0 }, "minecraft:dirt");
            dimension.spawnEntity("dave:hay_trader", {
                x: 4.5,
                y: 64,
                z: 0.5
            });
            world.setDynamicProperty("ess:worldSetup", true);
        }
    }, 20 * 2);
});
const playerCooldowns = new Map();
world.beforeEvents.playerInteractWithBlock.subscribe(({ player, itemStack, block }) => {
    for (const generator of generatorRegistry) {
        const dimension = player.dimension;
        const blockLoc = block.center();
        if (itemStack && itemStack.typeId === generator.id) {
            system.run(() => {
                const now = Date.now();
                const lastUsed = playerCooldowns.get(player.nameTag) ?? 0;
                if (now - lastUsed < 260)
                    return;
                playerCooldowns.set(player.nameTag, now);
                const spawnedEntity = dimension.spawnEntity("dave:generator", {
                    x: blockLoc.x,
                    y: blockLoc.y + 0.5,
                    z: blockLoc.z
                });
                const eventID = itemStack.typeId.split("_generator");
                spawnedEntity.triggerEvent(eventID[0]);
                spawnedEntity.addTag(itemStack.typeId);
                spawnedEntity.nameTag = itemTypeIdToName(generator.id);
                spawnedEntity.addTag("initial_spawn");
                player.runCommand(`clear @s ${itemStack.typeId} 0 1`);
            });
        }
    }
});
function sellItemHandler(player, selectedItem) {
    const moneyData = new Money();
    const moneyAmount = moneyData.get(player.nameTag);
    const itemName = itemTypeIdToName(selectedItem.id);
    const inv = player.getComponent(EntityComponentTypes.Inventory);
    const con = inv?.container;
    if (!inv || !con)
        return;
    let itemAmount = 0;
    for (let i = 0; i < inv.inventorySize; i++) {
        const itemInv = con.getItem(i);
        if (itemInv && itemInv.typeId === selectedItem.id) {
            itemAmount += itemInv.amount;
        }
    }
    let form = new ModalFormData()
        .title(`Sell ${itemName}`)
        .label(`Your money: §a$${moneyAmount}\n\n§bItem: §r${itemName}\n§bPrice: §a$${selectedItem.price} / item`)
        .slider('Amount', 1, itemAmount, { defaultValue: itemAmount })
        .submitButton(`Buy ${itemName}`);
    form.show(player).then(res => {
        if (res.formValues) {
            const itemAmount = res.formValues[1] ?? 1;
            const totalPrice = selectedItem.price * itemAmount;
            const commandRes = player.runCommand(`clear @s ${selectedItem.id} 0 ${itemAmount}`);
            if (commandRes.successCount === 1) {
                moneyData.add(player.nameTag, totalPrice);
                player.sendMessage(`Successfully sale §e${itemAmount}x§r §b${itemName}§r for §a$${totalPrice.toFixed(2)}§r`);
                player.playSound("mob.villager.yes");
            }
            else {
                player.sendMessage(`§cYou don't have enough item!`);
                player.playSound("mob.villager.no");
            }
        }
    });
}
function buyItemHandler(player, selectedItem) {
    const moneyData = new Money();
    const moneyAmount = moneyData.get(player.nameTag);
    const itemName = itemTypeIdToName(selectedItem.id);
    let form = new ModalFormData()
        .title(`Buy ${itemName}`)
        .label(`Your money: §a$${moneyAmount}\n\n§bItem: §r${itemName}\n§bPrice: §a$${selectedItem.price} / item`)
        .slider('Amount', 1, Math.floor(moneyAmount / selectedItem.price))
        .submitButton(`Buy ${itemName}`);
    form.show(player).then(res => {
        if (res.formValues) {
            const itemAmount = res.formValues[1] ?? 1;
            const totalPrice = selectedItem.price * itemAmount;
            const isCanceled = new Money().remove(player.nameTag, totalPrice);
            if (!isCanceled) {
                player.sendMessage(`Successfully purchased §e${itemAmount}x§r §b${itemName}§r for §a$${totalPrice.toFixed(2)}§r`);
                player.dimension.spawnItem(new ItemStack(selectedItem.id, itemAmount), player.location);
                player.playSound("mob.villager.yes");
            }
            else {
                player.sendMessage(`§cYou don't have enough money! Total price: $${totalPrice.toFixed(2)}`);
                player.playSound("mob.villager.no");
            }
        }
    });
}
function sellItemUI(player) {
    player.playSound("mob.villager.haggle");
    const moneyAmount = new Money().get(player.nameTag);
    let form = new ActionFormData()
        .title(`§f§2§2§r§l§0Sell Item\n§r§2$${moneyAmount}`);
    for (let i = 0; i < itemSellableRegistry.length; i++) {
        const { id, price } = itemSellableRegistry[i];
        const amount = 1;
        if (!id)
            continue;
        const itemName = itemTypeIdToName(id);
        const soldInfo = amount > 1
            ? `x${amount}\n${itemName}`
            : itemName;
        const icon = convertTypeIdToAuxIcon(id);
        const buttonText = `§r${truncateWithDots(soldInfo)}\n§a$${parseFloat(price.toFixed(4))}`;
        form.button(buttonText, icon);
    }
    form.show(player).then(res => {
        if (res.selection !== undefined) {
            sellItemHandler(player, itemSellableRegistry[res.selection]);
        }
        else {
            player.playSound("mob.villager.no");
        }
    });
}
function buyItemUI(player) {
    player.playSound("mob.villager.haggle");
    const moneyAmount = new Money().get(player.nameTag);
    let form = new ActionFormData()
        .title(`§f§2§2§r§l§0Buy Item\n§r§2$${moneyAmount}`);
    for (let i = 0; i < itemBuyableRegistry.length; i++) {
        const { id, price, enchantment } = itemBuyableRegistry[i];
        const amount = 1;
        if (!id)
            continue;
        const itemName = enchantment !== undefined ? itemTypeIdToName(enchantment[0].id) : itemTypeIdToName(id);
        const soldInfo = amount > 1
            ? `x${amount}\n${itemName}`
            : itemName;
        const icon = convertTypeIdToAuxIcon(id);
        const buttonText = `§r${truncateWithDots(soldInfo)}\n§a$${parseFloat(price.toFixed(4))}`;
        form.button(buttonText, icon);
    }
    form.show(player).then(res => {
        if (res.selection !== undefined) {
            buyItemHandler(player, itemBuyableRegistry[res.selection]);
        }
        else {
            player.playSound("mob.villager.no");
        }
    });
}
world.beforeEvents.playerInteractWithEntity.subscribe(({ target: entity, player }) => {
    if (entity.typeId === "dave:hay_trader") {
        system.run(() => {
            let form = new ActionFormData()
                .title('§f§0§1§r§l§0Trader')
                .button("Sell Item")
                .button("Buy Item");
            form.show(player).then(res => {
                if (res.selection === 0)
                    sellItemUI(player);
                if (res.selection === 1)
                    buyItemUI(player);
            });
        });
    }
    if (player.isSneaking && entity.typeId === "dave:generator") {
        for (const generator of generatorRegistry) {
            if (entity.hasTag(generator.id)) {
                system.run(() => {
                    entity.dimension.spawnItem(new ItemStack(generator.id), entity.location);
                    entity.kill();
                    system.runTimeout(() => {
                        entity.teleport({
                            x: entity.location.x,
                            y: -60,
                            z: entity.location.z
                        });
                    }, 2);
                });
            }
        }
    }
});
world.beforeEvents.playerBreakBlock.subscribe(({ dimension, player, block }) => {
    let blockLoc = block.location;
    if (blockLoc.x == 0 && blockLoc.y == 63 && blockLoc.z == 0) {
        let pLoc = player.location;
        system.run(() => {
            dimension.getEntities({ type: "minecraft:item", maxDistance: 2, location: blockLoc }).forEach(item => {
                item.teleport({
                    x: 0.5,
                    y: 64.5,
                    z: 0.5
                });
            });
            player.teleport({
                x: pLoc.x,
                y: pLoc.y,
                z: pLoc.z
            });
            dimension.setBlockType({
                x: 0,
                y: 63,
                z: 0
            }, oneBlocks[Math.floor(Math.random() * oneBlocks.length)]);
        });
    }
});
world.afterEvents.entitySpawn.subscribe(({ entity }) => {
    for (const generator of generatorRegistry) {
        if (entity.typeId === generator.id) {
            entity.nameTag = itemTypeIdToName(generator.id);
        }
    }
});
let counter = 0;
system.runInterval(() => {
    counter++;
    world.getPlayers().forEach(player => {
        const dimension = player.dimension;
        dimension.getEntities().forEach(entity => {
            for (const generator of generatorRegistry) {
                if (entity.hasTag("initial_spawn")) {
                    if (counter % 10 === 1) {
                        entity.removeTag("initial_spawn");
                        console.log("generator now working!");
                    }
                }
                else if (entity.hasTag(generator.id)) {
                    if (counter % generator.cooldown === 1) {
                        const generatedItemId = generator.generate[Math.floor(Math.random() * generator.generate.length)];
                        const inv = entity.getComponent(EntityComponentTypes.Inventory);
                        const con = inv?.container;
                        if (!inv || !con)
                            return;
                        for (let i = 0; i < inv.inventorySize; i++) {
                            const slotItem = con.getItem(i);
                            if (!slotItem) {
                                con.addItem(new ItemStack(generatedItemId));
                                break;
                            }
                        }
                    }
                }
            }
        });
    });
}, 20);
