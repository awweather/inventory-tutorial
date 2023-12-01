import Armor from "./Armor.ts";
import Consumable from "./Consumable.ts";
import Descriptor from "./Descriptor.ts";
import EntityId from "./EntityId.ts";
import PickedUp from "./PickedUp.ts";
import Quantity from "./Quantity.ts";
import Renderable from "./Renderable.ts";
import Valuable from "./Valuable.ts";
import Weapon from "./Weapon.ts";

export {
  Armor,
  Consumable,
  Descriptor,
  EntityId,
  PickedUp,
  Quantity,
  Renderable,
  Valuable,
  Weapon,
};

export const components: ComponentTypes = {
  Armor,
  Consumable,
  Descriptor,
  EntityId,
  PickedUp,
  Quantity,
  Renderable,
  Valuable,
  Weapon,
};

export type ComponentTypes = {
  Armor: typeof Armor;
  Consumable: typeof Consumable;
  Descriptor: typeof Descriptor;
  EntityId: typeof EntityId;
  PickedUp: typeof PickedUp;
  Quantity: typeof Quantity;
  Renderable: typeof Renderable;
  Valuable: typeof Valuable;
  Weapon: typeof Weapon;
};
