import { GameEntity } from "../../ecs/GameEntity.ts";

export const enum InventoryEvent {
  ITEM_ADDED = "item_added",
  ITEM_MOVED = "item_moved",
}

export interface ItemMovedProps {
  currentSlotIndex: number;
  item: GameEntity;
}

export interface InventoryEventMap {
  [InventoryEvent.ITEM_ADDED]: GameEntity;
  [InventoryEvent.ITEM_MOVED]: ItemMovedProps;
}

export class InventoryEventEmitter extends Phaser.Events.EventEmitter {
  emit<K extends keyof InventoryEventMap>(
    event: K,
    args: InventoryEventMap[K]
  ): boolean {
    return super.emit(event, args);
  }

  on<K extends keyof InventoryEventMap>(
    event: K,
    fn: (args: InventoryEventMap[K]) => void,
    context?: any
  ): this {
    return super.on(event, fn, context);
  }
}
