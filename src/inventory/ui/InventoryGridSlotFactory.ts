import OverlapSizer from "phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer";
import { InventoryGridContext } from "../../InventoryGridContext.ts";
import MainScene from "../../scenes/MainScene.ts";
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

      //   slot.registerManagers(
      //     new InventoryGridSlotPointerEventManager(scene, slot)
      //   );

      slots.push(slot);
    }

    return slots;
  }
}
