import { ComponentConstructor, World } from "ecsy";
import { GameEntity } from "./GameEntity.ts";
import { components } from "./components/Components.ts";

export default function initializeWorld() {
  const world = new World({ entityClass: GameEntity });

  Object.values(components).forEach((component) => {
    world.registerComponent(component as ComponentConstructor<any>);
  });

  return world;
}
