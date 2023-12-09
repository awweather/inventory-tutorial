import Phaser from "phaser";
import Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import type RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import itemsAtlas from "../assets/items/items.json";
import itemsImage from "../assets/items/items.png";
import uiJson from "../assets/ui.json";
import uiImg from "../assets/ui.png";
import { initializeEntity } from "../ecs/InitializeEntity.ts";
import { addToInventory } from "../inventory/state/InventoryUtilities.ts";
import InventoryWindowFactory from "../inventory/ui/InventoryWindowFactory.ts";
import { playerEntity } from "../main.ts";
import { getPlayerItems } from "../prefabs/Player.ts";

export default class MainScene extends Phaser.Scene {
  rexUI!: RexUIPlugin;
  itemTooltip?: Sizer;

  constructor() {
    super("MainScene");
  }

  preload() {
    const itemAtlasMeta = itemsAtlas.meta as any;
    itemAtlasMeta.image = itemsImage;
    this.load.atlas("A_Items", itemsImage, itemsAtlas);

    const uiAtlasMeta = uiJson.meta as any;
    uiAtlasMeta.image = uiImg;
    this.load.atlas("A_UI", uiImg, uiJson);
  }

  create() {
    InventoryWindowFactory.create(this);

    const playerItems = getPlayerItems();

    playerItems.forEach((item) => {
      const entity = initializeEntity(item as any);
      addToInventory(playerEntity, entity);
    });
  }

  update(time: number, delta: number): void {}
}
