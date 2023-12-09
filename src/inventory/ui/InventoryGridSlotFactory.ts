import OverlapSizer from "phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer";
import { InventoryGridContext } from "../../InventoryGridContext.ts";
import MainScene from "../../scenes/MainScene.ts";
import InventoryGridSlotDragManager from "../managers/InventoryDragManager.ts";
import InventoryGridSlotItemManager from "../managers/InventoryGridSlotItemManager.ts";
import InvetoryItemTooltipManager from "../managers/InventoryItemTooltipManager.ts";
import InventoryPointerEventManager from "../managers/InventoryPointerEventManager.ts";
import { getValidDropTarget } from "../utils/Utils.ts";
import InventoryGridSlot from "./InventoryGridSlot.ts";

export default class InventoryGridSlotFactory {
  static create(
    scene: MainScene,
    amount: number,
    createSlotSprite: (scene: MainScene) => OverlapSizer
  ) {
    const slots = [];

    for (let i = 0; i < amount; i++) {
      const slotSprite = createSlotSprite(scene);

      const slot = new InventoryGridSlot(
        slotSprite,
        InventoryGridContext.inventory
      );

      slot.registerManagers(
        new InventoryPointerEventManager(scene, slot),
        new InventoryGridSlotItemManager(scene, slot),
        new InventoryGridSlotDragManager(scene, slot, getValidDropTarget),
        new InvetoryItemTooltipManager(scene, slot)
      );

      slots.push(slot);
    }

    return slots;
  }
}
