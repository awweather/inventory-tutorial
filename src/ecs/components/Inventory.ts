import { Component, Types } from "ecsy";

export class ItemSlot {
  constructor(public item: string, public slotIndex: number) {}

  hasItem() {
    return this.item && this.item !== "";
  }

  addItem(item: string) {
    if (this.hasItem()) {
      throw new Error("ItemSlot already has an item");
    }

    this.item = item;
  }

  removeItem(): string {
    const item = this.item;

    this.item = "";

    return item;
  }
}

class Inventory extends Component<any> {
  slots: ItemSlot[] = [];
  items: string[] = [];

  constructor() {
    super();

    this.slots = [];
    this.items = [];
  }

  firstAvailableSlot() {
    return this.slots.find((slot) => {
      return !slot.hasItem();
    });
  }

  copy(source: Inventory) {
    this.items = source.items;
    this.slots = source.slots.map((slot: ItemSlot) => {
      return new ItemSlot(slot.item, slot.slotIndex);
    });

    return this;
  }
}

Inventory.schema = {
  items: { type: Types.Array },
  slots: { type: Types.Array },
};

export default Inventory;
