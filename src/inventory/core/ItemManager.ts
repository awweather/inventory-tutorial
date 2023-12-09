import { AddItemConfig } from "../ui/InventoryGridSlot.ts";
import Item from "../ui/Item.ts";

export interface ItemManager {
  addItem(addItemConfig: AddItemConfig): Item;
  updateQuantity(val: number): void;
  hideItem(): void;
  showItem(): void;
  removeItem(): string;
  hasItem(): boolean;
  getItem(): Item | null;
}
