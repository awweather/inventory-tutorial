import MainScene from "../../scenes/MainScene.ts";

export default class InventoryGridSlotSpriteFactory {
  static create(scene: MainScene) {
    const slotSpriteBg = scene.add.image(0, 0, "A_UI", "InventorySlot.png");

    const slotSprite = scene.rexUI.add.overlapSizer({
      x: 0,
      y: 0,
      width: slotSpriteBg.displayWidth * 2,
      height: slotSpriteBg.displayHeight * 2,
    });

    slotSprite.addBackground(slotSpriteBg);
    return slotSprite;
  }
}
