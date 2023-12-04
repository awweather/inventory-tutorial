import { Component } from "ecsy";
import type { GameEntity } from "../../ecs/Entities";
declare module "ecsy" {
  interface EntityManager {
    createEntity(id: string): GameEntity;
    getEntityByName(id: string): GameEntity;
    removeEntity(entity: GameEntity);
    queryComponents(Components: Component[]);
  }

  interface World {
    entityManager: EntityManager;
  }

  interface Entity {
    name: string;
  }
}
