import OverlapSizer from "phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer";
import { InventoryGridContext } from "../../InventoryGridContext.ts";
import { GameEntity } from "../../ecs/GameEntity.ts";
import Descriptor from "../../ecs/components/Descriptor.ts";
import PickedUp from "../../ecs/components/PickedUp.ts";
import Quantity from "../../ecs/components/Quantity.ts";
import Renderable from "../../ecs/components/Renderable.ts";
import DragManager from "../core/DragManager.ts";
import { ItemManager } from "../core/ItemManager.ts";
import { ItemTooltipManager } from "../core/ItemTooltipManager.ts";
import { PointerEventManager } from "../core/PointerEventManager.ts";
import {
  InventoryGridSlotEvent,
  InventoryGridSlotEventEmitter,
} from "../events/InventoryGridSlotEventEmitter.ts";

export interface AddItemConfig {
  renderable: Renderable;
  descriptor: Descriptor;
  pickedUp: PickedUp | undefined;
  quantity: Quantity | undefined;
  entity: GameEntity;
}

export default class InventoryGridSlot {
  private pointerEventManager: PointerEventManager | undefined;
  private itemManager: ItemManager | undefined;
  private dragManager: DragManager | undefined;
  private itemTooltipManager: ItemTooltipManager | undefined;

  public readonly events: InventoryGridSlotEventEmitter =
    new InventoryGridSlotEventEmitter();

  public slotIndex: number = 0;

  constructor(
    public readonly slotSprite: OverlapSizer,
    public readonly slotType: InventoryGridContext
  ) {
    this.slotSprite.setData("slotIndex", this.slotIndex);
    this.slotSprite.setData("slotType", slotType);
  }

  addItem(addItemConfig: AddItemConfig) {
    const item = this.itemManager!.addItem(addItemConfig);

    this.events.emit(InventoryGridSlotEvent.ITEM_ADDED, item);

    this.slotSprite.setData("hasItem", true);

    return item;
  }

  removeItem() {
    this.itemManager!.removeItem();

    this.slotSprite.setData("hasItem", false);
  }

  setSlotIndex(slotIndex: number) {
    this.slotIndex = slotIndex;
    this.slotSprite.setData("slotIndex", this.slotIndex);
  }

  getItem() {
    return this.itemManager?.getItem();
  }

  hasItem() {
    return this.itemManager?.hasItem();
  }

  showItemInfo() {
    // this.itemTooltipManager?.showItemTooltip();
  }

  handlePointerOut(activePointer: Phaser.Input.Pointer) {
    this.pointerEventManager?.handlePointerOut(activePointer);
  }
  handlePointerOver(activePointer: Phaser.Input.Pointer) {
    this.pointerEventManager?.handlePointerOut(activePointer);
  }

  registerManagers(
    pointerEventManager: PointerEventManager,
    itemManager: ItemManager,
    dragManager: DragManager,
    itemTooltipManager: ItemTooltipManager
  ) {
    this.pointerEventManager = pointerEventManager;
    this.itemManager = itemManager;
    this.dragManager = dragManager;
    this.itemTooltipManager = itemTooltipManager;
  }
}
