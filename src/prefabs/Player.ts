import { v4 as uuidv4 } from "uuid";
import { GameEntity } from "../ecs/GameEntity.ts";
import { initializeEntity } from "../ecs/InitializeEntity.ts";

const playerPreset = {
  inventory: {
    slots: [
      {
        slotIndex: 0,
        item: "",
      },
      {
        slotIndex: 1,
        item: "",
      },
      {
        slotIndex: 2,
        item: "",
      },
      {
        slotIndex: 3,
        item: "",
      },
      {
        slotIndex: 4,
        item: "",
      },
      {
        slotIndex: 5,
        item: "",
      },
      {
        slotIndex: 6,
        item: "",
      },
      {
        slotIndex: 7,
        item: "",
      },
      {
        slotIndex: 8,
        item: "",
      },
      {
        slotIndex: 9,
        item: "",
      },
      {
        slotIndex: 10,
        item: "",
      },
      {
        slotIndex: 11,
        item: "",
      },
      {
        slotIndex: 12,
        item: "",
      },
      {
        slotIndex: 13,
        item: "",
      },
      {
        slotIndex: 14,
        item: "",
      },
      {
        slotIndex: 15,
        item: "",
      },
      {
        slotIndex: 16,
        item: "",
      },
      {
        slotIndex: 17,
        item: "",
      },
      {
        slotIndex: 18,
        item: "",
      },
      {
        slotIndex: 19,
        item: "",
      },
      {
        slotIndex: 20,
        item: "",
      },
      {
        slotIndex: 21,
        item: "",
      },
      {
        slotIndex: 22,
        item: "",
      },
      {
        slotIndex: 23,
        item: "",
      },
      {
        slotIndex: 24,
        item: "",
      },
    ],
    items: [],
  },
  descriptor: {
    name: "HeyThisiSDevByDusk!",
  },
};

export default function getPlayer(): GameEntity {
  const entityId = uuidv4();
  return initializeEntity({
    components: { ...playerPreset } as any,
    entityID: entityId,
  });
}
