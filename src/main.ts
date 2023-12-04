import { config } from "./config/PhaserConfig.ts";
import initializeWorld from "./ecs/InitializeWorld.ts";
import { getItems } from "./prefabs/Items.ts";
import getPlayer from "./prefabs/Player.ts";

export const game = new Phaser.Game(config);

export const world = initializeWorld();
const items = getItems();

export const playerEntity = getPlayer();
