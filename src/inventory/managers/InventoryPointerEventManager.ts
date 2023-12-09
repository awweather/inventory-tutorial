import MainScene from "../../scenes/MainScene.ts";
import { PointerEventManager } from "../core/PointerEventManager.ts";
import { InventoryGridSlotEvent } from "../events/InventoryGridSlotEventEmitter.ts";
import InventoryGridSlot from "../ui/InventoryGridSlot.ts";

export default class InventoryPointerEventManager
  implements PointerEventManager
{
  constructor(
    private readonly scene: MainScene,
    private readonly itemSlot: InventoryGridSlot
  ) {
    itemSlot.slotSprite
      .setInteractive({
        dropZone: true,
        hitArea: new Phaser.Geom.Rectangle(0, 0, 64, 64),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      })
      .on("pointerover", (pointer: Phaser.Input.Pointer) => {
        this.handlePointerOver(pointer);
      })
      .on("pointerout", (pointer: Phaser.Input.Pointer) => {
        this.handlePointerOut(pointer);
      })
      .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
        this.handlePointerOut(pointer);
      })
      .on("pointerup", (pointer: Phaser.Input.Pointer) => {
        this.handlePointerUp(pointer);
      });

    // Handles pointer events for when the
    this.itemSlot.events.on(InventoryGridSlotEvent.ITEM_ADDED, (item) => {
      item.itemSprite
        .on("pointerover", (pointer: Phaser.Input.Pointer) => {
          this.handlePointerOver(pointer);
        })
        .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
          this.handlePointerOut(pointer);
        })
        .on("pointerout", (pointer: Phaser.Input.Pointer) => {
          this.handlePointerOut(pointer);
        })
        .on("pointerup", (pointer: Phaser.Input.Pointer) => {
          this.handlePointerOut(pointer);
        });
    });
  }
  handlePointerOver(_pointer: Phaser.Input.Pointer) {
    // The typings for the UI plugin don't include this.backgroundChildren
    const anyHack = this.itemSlot.slotSprite as any;
    const bg = anyHack.backgroundChildren[0] as Phaser.GameObjects.Image;

    bg.setFrame("InventorySlot_Hover.png");

    if (this.itemSlot.hasItem()) {
      this.itemSlot.showItemInfo();
    }
  }

  handlePointerOut(pointer: Phaser.Input.Pointer) {
    // The typings for the UI plugin don't include this.backgroundChildren
    const anyHack = this.itemSlot.slotSprite as any;
    const bg = anyHack.backgroundChildren[0] as Phaser.GameObjects.Image;
    bg.setFrame("InventorySlot.png");

    this.scene.itemTooltip?.setVisible(false);
    this.scene.itemTooltip?.destroy(true);
  }

  handlePointerUp(pointer: Phaser.Input.Pointer) {}
}
