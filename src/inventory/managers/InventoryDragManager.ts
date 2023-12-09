import OverlapSizer from "phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer";
import { InventoryGridContext } from "../../InventoryGridContext.ts";
import MainScene from "../../scenes/MainScene.ts";
import DragManager from "../core/DragManager.ts";
import { InventoryGridSlotEvent } from "../events/InventoryGridSlotEventEmitter.ts";
import InventoryGridSlot from "../ui/InventoryGridSlot.ts";
import Item from "../ui/Item.ts";

export default class InventoryGridSlotDragManager implements DragManager {
  constructor(
    private readonly scene: MainScene,
    private readonly itemSlot: InventoryGridSlot,
    private readonly getValidDropTarget: (
      context: InventoryGridContext
    ) => InventoryGridContext[]
  ) {
    this.itemSlot.events.on(InventoryGridSlotEvent.ITEM_ADDED, (item: Item) => {
      item.itemSprite.on(
        "drop",
        (pointer: Phaser.Input.Pointer, itemSlotSprite: OverlapSizer) => {
          this.handleDragDrop(pointer, itemSlotSprite, item);
        }
      );

      item.itemSprite.on(
        "dragenter",
        (pointer: Phaser.Input.Pointer, itemSlotSprite: OverlapSizer) => {
          this.handleDragEnter(pointer, itemSlotSprite);
        }
      );

      item.itemSprite.on(
        "dragleave",
        (pointer: Phaser.Input.Pointer, itemSlotSprite: OverlapSizer) => {
          this.handleDragLeave(pointer, itemSlotSprite);
        }
      );
    });
  }
  handleDragEnter(pointer: Phaser.Input.Pointer, itemSlotSprite: OverlapSizer) {
    const slotContext = itemSlotSprite.getData("slotType");
    const slotIndex = itemSlotSprite.getData("slotIndex");
    if (this.getValidDropTarget(slotContext)) {
      this.itemSlot.events.emit(InventoryGridSlotEvent.DRAG_LEAVE, {
        slotIndex,
        slotContext,
      });
    }
  }

  handleDragLeave(
    _pointer: Phaser.Input.Pointer,
    itemSlotSprite: OverlapSizer
  ) {
    const slotContext = itemSlotSprite.getData("slotType");
    const slotIndex = itemSlotSprite.getData("slotIndex");
    if (this.getValidDropTarget(slotContext)) {
      this.itemSlot.events.emit(InventoryGridSlotEvent.DRAG_OVER, {
        slotIndex,
        slotContext,
      });
    }
  }

  handleDragDrop(
    _pointer: Phaser.Input.Pointer,
    itemSlotSprite: OverlapSizer,
    item: Item
  ) {
    let isValidDropTarget = true;
    isValidDropTarget =
      isValidDropTarget &&
      this.getValidDropTarget(this.itemSlot.slotType).includes(
        itemSlotSprite.getData("slotType")
      );

    item.handleDrop();

    if (!isValidDropTarget) {
      item.resetPosition();
    }

    this.itemSlot.events.emit(InventoryGridSlotEvent.DRAG_ENDED, {
      startingSlotContext: this.itemSlot.slotType,
      startingSlotIndex: this.itemSlot.slotIndex,
      landingSlotContext: itemSlotSprite.getData("slotType"),
      landingSlotIndex: itemSlotSprite.getData("slotIndex"),
    });
  }
}
