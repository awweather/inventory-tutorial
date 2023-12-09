import GridSizer from "phaser3-rex-plugins/templates/ui/gridsizer/GridSizer";
import InventoryGridSlot, { AddItemConfig } from "../ui/InventoryGridSlot.ts";
import Item from "../ui/Item.ts";

export default class InventoryGridManager {
  constructor(
    public readonly grid: GridSizer,
    public readonly slots: InventoryGridSlot[]
  ) {}

  addItem(itemConfig: AddItemConfig, slotIndex?: number): Item | null {
    const slot =
      slotIndex !== undefined
        ? this.getSlotAtIndex(slotIndex)
        : this.getSlotAtIndex(itemConfig.pickedUp!.slotIndex);

    if (slot) {
      const item = slot.addItem(itemConfig);
      this.grid.layout();
      return item;
    }

    return null;
  }

  removeItem(slotIndex: number) {
    const slot = this.getSlotAtIndex(slotIndex);

    if (slot) {
      slot.removeItem();
      this.grid.layout();
    }
  }

  getSlotAtIndex(index: number) {
    const slot = this.slots[index];

    return slot;
  }
}
