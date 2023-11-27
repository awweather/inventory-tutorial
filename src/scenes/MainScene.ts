import Phaser from "phaser";
import type RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import uiJson from "../assets/ui.json";
import uiImg from "../assets/ui.png";
import InventoryWindowFactory from "../inventory/ui/InventoryWindowFactory.ts";

export default class MainScene extends Phaser.Scene {
  rexUI!: RexUIPlugin;
  constructor() {
    super("MainScene");
  }

  preload() {
    const uiAtlasMeta = uiJson.meta as any;
    uiAtlasMeta.image = uiImg;

    this.load.atlas("A_UI", uiImg, uiJson);
  }

  create() {
    InventoryWindowFactory.create(this);
  }

  update(time: number, delta: number): void {}
}
