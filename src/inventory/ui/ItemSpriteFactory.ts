export default class ItemSpriteFactory {
  static create(scene: Phaser.Scene, x: number, y: number, frame: string) {
    return scene.add.sprite(x, y, "A_Items", frame);
  }
}
