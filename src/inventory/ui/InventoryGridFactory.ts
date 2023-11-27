import MainScene from "../../scenes/MainScene.ts";
import InventoryGridSlotFactory from "./InventoryGridSlotFactory.ts";
import InventoryGridSlotSpriteFactory from "./InventoryGridSlotSpriteFactory.ts";

export default class InventoryGridFactory {
  static create(scene: MainScene) {
    const slots = InventoryGridSlotFactory.create(
      scene,
      25,
      InventoryGridSlotSpriteFactory.create
    );

    const cols = 5;
    const rows = 5;
    const table = scene.rexUI.add.gridSizer({
      column: cols,
      row: rows,
      space: { column: 0, row: 0 },
    });

    for (let i = 0; i < slots.length; i++) {
      const itemSlot = slots[i];
      const row = i % cols;
      const column = (i - row) / cols;

      const rightPadding = column === cols - 1 ? 5 : 0;
      const bottompadding = row === rows - 1 ? 5 : 0;

      itemSlot.setSlotIndex(row * cols + column);

      table.add(itemSlot.slotSprite, {
        column: column,
        row: row,
        padding: {
          top: 5,
          right: rightPadding,
          left: 5,
          bottom: bottompadding,
        },
        key: i.toString(),
        align: "center",
      });
    }

    // We have to sort these because the rexUI plugin adds item slots to the grid column by column, instead of row by row
    // This ensures that slots[index] gives you the correct item slot as if you were counting from left to right
    slots.sort((slotA, slotB) => {
      return slotA.slotIndex - slotB.slotIndex;
    });

    return table;
  }
}
