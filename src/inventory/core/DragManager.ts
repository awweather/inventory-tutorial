import OverlapSizer from "phaser3-rex-plugins/templates/ui/overlapsizer/OverlapSizer";
import Item from "../ui/Item.ts";

export default interface DragManager {
  handleDragEnter: (
    pointer: Phaser.Input.Pointer,
    itemSlotSprite: OverlapSizer
  ) => void;
  handleDragLeave: (
    pointer: Phaser.Input.Pointer,
    itemSlotSprite: OverlapSizer
  ) => void;
  handleDragDrop: (
    pointer: Phaser.Input.Pointer,
    itemSlotSprite: OverlapSizer,
    item: Item
  ) => void;
}
