import DragPlugin from "phaser3-rex-plugins/plugins/drag-plugin.js";
import { GameEntity } from "../../ecs/GameEntity.ts";
import { AddItemConfig } from "./InventoryGridSlot.ts";

export default class Item {
  entity: GameEntity;
  initialPosition: Phaser.Math.Vector2;
  constructor(
    public readonly itemSprite: Phaser.GameObjects.Sprite,
    config: AddItemConfig
  ) {
    this.entity = config.entity;
    this.initialPosition = new Phaser.Math.Vector2(
      this.itemSprite.x,
      this.itemSprite.y
    );

    this.itemSprite.setScale(1.5);

    this.itemSprite
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
        this.handleDrag(pointer);
      });

    this.itemSprite.on("dragstart", () => {
      this.itemSprite.setScale(2);
    });

    this.itemSprite.on("dragend", () => {
      this.resetPosition();
    });
  }

  handleDrag(pointer: Phaser.Input.Pointer) {
    // Record the start position of the pointer
    let dragStartX = pointer.x;
    let dragStartY = pointer.y;

    let isDragging = false;

    const dragThreshold = 10; //Pixels the pointer needs to move to start the drag

    const item = this;

    this.itemSprite.scene.input.on(
      "pointermove",
      function (this: Item, pointer: Phaser.Input.Pointer) {
        if (!pointer.isDown) {
          this.handleDrop();
          return;
        }

        // Calculate distance pointer has moved
        const distance = Phaser.Math.Distance.Between(
          dragStartX,
          dragStartY,
          pointer.x,
          pointer.y
        );

        if (!isDragging && distance > dragThreshold) {
          isDragging = true;
          item.initiateDrag();
        }
      },
      this
    );
  }
  initiateDrag() {
    const dragPlugin = this.itemSprite.scene.plugins.get(
      "dragPlugin"
    ) as DragPlugin;

    const dragComponent = dragPlugin.add(this.itemSprite);
    dragComponent.drag();

    this.itemSprite.setDepth(999); // we want the item sprite on top of everything else
  }

  resetPosition() {
    this.itemSprite.x = this.initialPosition.x;
    this.itemSprite.y = this.initialPosition.y;
    this.itemSprite.setScale(1.5);
  }

  handleDrop() {
    this.itemSprite.scene.input.off("pointermove");
  }
}
