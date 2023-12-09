import MainScene from "../../scenes/MainScene.ts";
import { ItemTooltipManager } from "../core/ItemTooltipManager.ts";
import InventoryGridSlot from "../ui/InventoryGridSlot.ts";
import ItemTooltipFactory from "../ui/ItemTooltipFactory.ts";

export default class InvetoryItemTooltipManager implements ItemTooltipManager {
  constructor(
    private readonly scene: MainScene,
    private readonly itemSlot: InventoryGridSlot
  ) {}
  showItemTooltip(): void {
    this.scene.itemTooltip?.destroy();

    const itemEntity = this.itemSlot.getItem()!.entity;

    this.scene.itemTooltip = ItemTooltipFactory.create(this.scene, itemEntity);

    const y =
      this.itemSlot.slotSprite.y +
      this.itemSlot.slotSprite.height / 2 +
      this.scene.itemTooltip.height / 2;

    this.scene.itemTooltip
      .setX(this.itemSlot.slotSprite.x)
      .setY(y)
      .setDepth(205);
  }
}
