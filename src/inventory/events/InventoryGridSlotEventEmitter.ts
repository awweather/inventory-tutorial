import { InventoryGridContext } from "../../InventoryGridContext.ts";
import { GameEntity } from "../../ecs/GameEntity.ts";
import Item from "../ui/Item.ts";

export const enum InventoryGridSlotEvent {
  ITEM_ADDED = "item_added",
  ITEM_REMOVED = "item_removed",
  ITEM_CLICKED = "item_clicked",
  DRAG_ENDED = "drag_ended",
  DRAG_OVER = "drag_over",
  DRAG_LEAVE = "drag_out",
}

export interface DragEndedProps {
  startingSlotIndex: number;
  startingSlotContext: InventoryGridContext;
  landingSlotIndex: number;
  landingSlotContext: InventoryGridContext;
}

export interface DragOverProps {
  slotIndex: number;
  slotContext: InventoryGridContext;
}

export interface DragOutProps {
  slotIndex: number;
  slotContext: InventoryGridContext;
}

export interface ItemClickedProps {
  slotIndex: number;
  slotType: InventoryGridContext;
  item: GameEntity;
}

export interface InventoryGridSlotEventMap {
  [InventoryGridSlotEvent.ITEM_ADDED]: Item;
  [InventoryGridSlotEvent.ITEM_REMOVED]: string;
  [InventoryGridSlotEvent.DRAG_ENDED]: DragEndedProps;
  [InventoryGridSlotEvent.ITEM_CLICKED]: ItemClickedProps;
  [InventoryGridSlotEvent.DRAG_OVER]: DragOverProps;
  [InventoryGridSlotEvent.DRAG_LEAVE]: DragOutProps;
}

export class InventoryGridSlotEventEmitter extends Phaser.Events.EventEmitter {
  emit<K extends keyof InventoryGridSlotEventMap>(
    event: K,
    args: InventoryGridSlotEventMap[K]
  ): boolean {
    return super.emit(event, args);
  }

  on<K extends keyof InventoryGridSlotEventMap>(
    event: K,
    fn: (args: InventoryGridSlotEventMap[K]) => void,
    context?: any
  ): this {
    return super.on(event, fn, context);
  }
}
