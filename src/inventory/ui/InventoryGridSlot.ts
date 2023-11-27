import OverlapSizer from "phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer";
import { InventoryGridContext } from "../../InventoryGridContext.ts";

export default class InventoryGridSlot {
  public slotIndex: number = 0;
  constructor(
    public readonly slotSprite: OverlapSizer,
    public readonly slotType: InventoryGridContext
  ) {}

  setSlotIndex(slotIndex: number) {
    this.slotIndex = slotIndex;
  }
}
