import MainScene from "../../scenes/MainScene.ts";
import { centerVH } from "../../utils/Utils.ts";
import InventoryWindowManager from "../managers/InventoryWindowManager.ts";
import InventoryGridFactory from "./InventoryGridFactory.ts";

export default class InventoryWindowFactory {
  static create(scene: MainScene) {
    const backgroundImg = scene.add.image(0, 0, "A_UI", "Inventory.png");
    const inventoryWindow = scene.rexUI.add.sizer({
      width: backgroundImg.displayWidth,
      height: backgroundImg.displayHeight,
      orientation: "y",
    });

    inventoryWindow.addBackground(backgroundImg);

    centerVH(inventoryWindow);

    const inventoryGridManager = InventoryGridFactory.create(scene);

    inventoryWindow.add(inventoryGridManager.grid, {
      padding: {
        left: 15,
        right: 15,
        top: 235,
      },
      expand: false,
    });

    inventoryWindow.layout();

    const inventoryWindowManager = new InventoryWindowManager(
      scene,
      inventoryGridManager
    );
  }
}
