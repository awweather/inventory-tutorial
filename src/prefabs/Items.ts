import { v4 as uuidv4 } from "uuid";
import { initializeEntity } from "../ecs/InitializeEntity.ts";
export type ItemKey = keyof typeof itemPresets;

export const itemPresets = {
  gold: {
    renderable: {
      sprite: {
        height: 45,
        width: 45,
        texture: "GoldPouch",
        frame: "GoldPouch.png",
      },
    },
    descriptor: {
      description: "Pretty self explanatory.",
      name: "Gold",
    },
    valuable: {
      value: 1,
    },
    quantity: {
      value: 1,
    },
  },
  dagger: {
    descriptor: {
      description: "A rusty old dagger, but better than nothing!",
      name: "Dagger",
    },
    equippable: {
      levelRequirement: "1",
      slot: "Hand",
    },
    weapon: {},
    renderable: {
      sprite: {
        height: 45,
        width: 45,
        texture: "A_Items",
        frame: "Dagger.png",
      },
    },
    valuable: {
      value: 6,
    },
  },
  crossbow: {
    descriptor: {
      description:
        "A sturdy crossbow capable of piercing armor from a distance.",
      name: "Crossbow",
    },
    equippable: {
      levelRequirement: "5",
      slot: "Hand",
    },
    weapon: {},
    renderable: {
      sprite: {
        height: 45,
        width: 45,
        texture: "A_Items",
        frame: "Crossbow.png",
      },
    },
    valuable: {
      value: 25,
    },
  },
  emeraldPendant: {
    descriptor: {
      description:
        "A pendant with a gleaming emerald, shimmering with latent magic.",
      name: "Emerald Pendant",
    },
    accessory: {},
    renderable: {
      sprite: {
        height: 45,
        width: 45,
        texture: "A_Items",
        frame: "EmeraldPendant.png",
      },
    },
    valuable: {
      value: 40,
    },
  },
  fullPlate: {
    descriptor: {
      description: "Heavy armor offering unmatched protection in battle.",
      name: "Full Plate Armor",
    },
    equippable: {
      levelRequirement: "8",
      slot: "Body",
    },
    armor: {},
    renderable: {
      sprite: {
        height: 45,
        width: 45,
        texture: "A_Items",
        frame: "FullPlate.png",
      },
    },
    valuable: {
      value: 75,
    },
  },
  greatSword: {
    descriptor: {
      description: "A massive sword that can cleave enemies in a single swing.",
      name: "Great Sword",
    },
    weapon: {},
    renderable: {
      sprite: {
        height: 45,
        width: 45,
        texture: "A_Items",
        frame: "GreatSword.png",
      },
    },
    valuable: {
      value: 50,
    },
  },
  skullPendant: {
    descriptor: {
      description: "A macabre pendant that seems to whisper in the dark.",
      name: "Skull Pendant",
    },
    equippable: {
      levelRequirement: "4",
      slot: "Neck",
    },
    accessory: {},
    renderable: {
      sprite: {
        height: 45,
        width: 45,
        texture: "A_Items",
        frame: "SkullPendant.png",
      },
    },
    valuable: {
      value: 30,
    },
  },
  mediumPotion: {
    descriptor: {
      description:
        "A potion that restores a moderate amount of health to the drinker.",
      name: "Medium Potion",
    },
    consumable: {},
    renderable: {
      sprite: {
        height: 45,
        width: 45,
        texture: "A_Items",
        frame: "MediumPotion.png",
      },
    },
    valuable: {
      value: 15,
    },
  },
  largePotion: {
    descriptor: {
      description: "A powerful potion that restores a large amount of health.",
      name: "Large Potion",
    },
    consumable: {},
    renderable: {
      sprite: {
        height: 45,
        width: 45,
        texture: "A_Items",
        frame: "LargePotion.png",
      },
    },
    valuable: {
      value: 30,
    },
  },
};

export function getItems() {
  const items = Object.keys(itemPresets);

  return items.map((presetKey) => {
    const base = itemPresets[presetKey as ItemKey] as any;
    const id = uuidv4();

    const rawEntity = {
      components: { ...base },
      entityID: id,
    };

    return initializeEntity(rawEntity);
  });
}
