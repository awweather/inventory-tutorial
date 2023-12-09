import Sizer from "phaser3-rex-plugins/templates/ui/sizer/Sizer";
import { GameEntity } from "../../ecs/GameEntity.ts";
import { Quantity } from "../../ecs/components/Components.ts";
import MainScene from "../../scenes/MainScene.ts";

export default class ItemTooltipFactory {
  static create(scene: MainScene, item: GameEntity) {
    const container = scene.rexUI.add.sizer({
      orientation: "x",
      width: 375,
      height: 300,
    });

    const itemTooltipPanel = scene.rexUI.add
      .sizer({
        orientation: "y",
        width: 150,
        height: 100,
        space: {
          item: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      })
      .addBackground(
        scene.rexUI.add
          .roundRectangle(0, 0, 150, 100, 4, 0x71413b)
          .setStrokeStyle(1, 0x000000)
      )
      .add(this.createTitleHeader(scene, item))
      .add(
        scene.rexUI.add
          .sizer({
            orientation: "y",
            width: 250,
            height: 200,
            space: {
              item: 5,
              top: 10,
            },
          })
          .add(
            scene.add.text(0, 0, `Value: ${this.getValue(item)}`, {
              fontSize: "12px",
              color: "white",
            }),
            { align: "center" }
          )
          .add(
            scene.add.text(0, 0, item.descriptor.description, {
              fontSize: "12px",
              color: "white",
            }),
            { align: "center" }
          )
      );

    return container.add(itemTooltipPanel).layout();
  }

  static getValue(item: GameEntity) {
    if (item.hasComponent(Quantity)) {
      return item.quantity.value * item.valuable.value;
    }

    return item.valuable.value;
  }

  static createTitleHeader(scene: MainScene, item: GameEntity): Sizer {
    const sizer = scene.rexUI.add.sizer({ orientation: "y", height: 38 });

    const text = scene.add.text(0, 0, item.descriptor.name, {
      fontSize: "12px",
      color: "white",
    });

    sizer.add(text, { padding: { top: 10 }, align: "center-center" });

    return sizer;
  }
}
