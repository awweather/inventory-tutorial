import { GameEntity } from "../../ecs/GameEntity.ts";
import MainScene from "../../scenes/MainScene.ts";
import { InventoryEvent } from "../events/InventoryEventEmitter.ts";
import { InventoryGridSlotEvent } from "../events/InventoryGridSlotEventEmitter.ts";
import {
  inventoryEvents,
  moveItemToSlot,
} from "../state/InventoryUtilities.ts";
import { decomposeItem, getValidDropTarget } from "../utils/Utils.ts";
import InventoryGridManager from "./InventoryGridManager.ts";

export default class InventoryWindowManager {
  constructor(
    private readonly scene: MainScene,
    private readonly playerInventory: InventoryGridManager
  ) {
    inventoryEvents.on(InventoryEvent.ITEM_ADDED, (item: GameEntity) => {
      this.playerInventory.addItem(decomposeItem(item));
    });

    playerInventory.slots.forEach((slot) => {
      slot.events.on(InventoryGridSlotEvent.DRAG_ENDED, (dragEndedProps) => {
        const { startingSlotIndex, landingSlotIndex } = dragEndedProps;

        const currentSlot =
          this.playerInventory.getSlotAtIndex(startingSlotIndex);

        const item = currentSlot.getItem();

        // call game logic
        moveItemToSlot(item!.entity.entityId.value, landingSlotIndex);
      });

      slot.events.on(InventoryGridSlotEvent.DRAG_OVER, (dragOverProps) => {
        const { slotIndex } = dragOverProps;
        const slot = this.playerInventory.getSlotAtIndex(slotIndex);

        if (!slot) return;

        const isValidDropTarget = getValidDropTarget(slot!.slotType).includes(
          dragOverProps.slotContext
        );

        if (!isValidDropTarget) return;

        slot.handlePointerOver(this.scene.input.activePointer);
      });

      slot.events.on(InventoryGridSlotEvent.DRAG_LEAVE, (dragLeaveProps) => {
        const { slotIndex } = dragLeaveProps;
        const slot = this.playerInventory.getSlotAtIndex(slotIndex);

        if (!slot) return;

        slot!.handlePointerOut(this.scene.input.activePointer);
      });
    });

    inventoryEvents.on(InventoryEvent.ITEM_MOVED, (itemMovedProps) => {
      this.playerInventory.removeItem(itemMovedProps.currentSlotIndex);

      this.playerInventory.addItem(decomposeItem(itemMovedProps.item));
    });
  }
}
