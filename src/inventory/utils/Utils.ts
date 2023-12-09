import { InventoryGridContext } from "../../InventoryGridContext.ts";
import { GameEntity } from "../../ecs/GameEntity.ts";
import PickedUp from "../../ecs/components/PickedUp.ts";
import Quantity from "../../ecs/components/Quantity.ts";
import { AddItemConfig } from "../ui/InventoryGridSlot.ts";

export function decomposeItem(item: GameEntity): AddItemConfig {
  return {
    entity: item,
    pickedUp: item.hasComponent(PickedUp) ? item.pickedUp : undefined,
    descriptor: item.descriptor,
    renderable: item.renderable,
    quantity: item.hasComponent(Quantity) ? item.quantity : undefined,
  };
}

export function getValidDropTarget(_context: InventoryGridContext) {
  return [InventoryGridContext.inventory];
}
