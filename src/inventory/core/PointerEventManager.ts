export interface PointerEventManager {
  handlePointerOver: (pointer: Phaser.Input.Pointer) => void;
  handlePointerOut: (pointer: Phaser.Input.Pointer) => void;
  handlePointerUp: (pointer: Phaser.Input.Pointer) => void;
}
