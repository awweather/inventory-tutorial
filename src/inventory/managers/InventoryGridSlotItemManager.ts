import MainScene from "../../scenes/MainScene.ts";
import { ItemManager } from "../core/ItemManager.ts";
import InventoryGridSlot, { AddItemConfig } from "../ui/InventoryGridSlot.ts";
import Item from "../ui/Item.ts";
import ItemSpriteFactory from "../ui/ItemSpriteFactory.ts";

export default class InventoryGridSlotItemManager implements ItemManager {
  private item: Item | null = null;
  private qty: Phaser.GameObjects.Text | null = null;
  constructor(
    private readonly scene: MainScene,
    private readonly itemSlot: InventoryGridSlot
  ) {}

  addItem(config: AddItemConfig): Item {
    // Create a new item sprite based on the item's config
    const itemSprite = ItemSpriteFactory.create(
      this.scene,
      this.itemSlot.slotSprite.x,
      this.itemSlot.slotSprite.y,
      config.renderable.sprite.frame
    );

    this.item = new Item(itemSprite, config);

    if (config.quantity) {
      this.qty = this.scene.add.text(0, 0, config.quantity.value.toString(), {
        fontSize: "16px",
      });

      this.itemSlot.slotSprite.add(this.qty, {
        expand: false,
        align: "right-bottom",
      });
    }

    // Set some arbitrary depth on the item to make sure its above the slot
    itemSprite.setDepth(201);

    return this.item;
  }

  updateQuantity(newQuantity: number): void {
    this.qty?.setText(newQuantity.toString());
  }

  hideItem(): void {
    if (this.hasItem()) {
      this.item?.itemSprite.setVisible(false);

      if (this.qty) {
        this.qty.setVisible(false);
      }
    }
  }

  showItem(): void {
    if (this.hasItem()) {
      this.item?.itemSprite.setVisible(true);

      if (this.qty) {
        this.qty.setVisible(true);
      }
    }
  }
  removeItem(): string {
    if (this.hasItem()) {
      const itemId = this.item!.entity.entityId.value;
      this.itemSlot.slotSprite.remove(this.item!.itemSprite, true);
      this.item?.itemSprite.destroy();

      if (this.qty) {
        this.qty.destroy();
      }

      this.item = null;

      return itemId;
    }

    return "";
  }
  hasItem(): boolean {
    return this.item !== null;
  }
  getItem(): Item | null {
    return this.item;
  }
}
