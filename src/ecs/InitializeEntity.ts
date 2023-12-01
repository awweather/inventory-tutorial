import { world } from "../main.ts";
import { GameEntity } from "./GameEntity.ts";
import { componentLookup } from "./components/ComponentLookup.ts";
import { ComponentTypes } from "./components/Components.ts";
import EntityId from "./components/EntityId.ts";

export interface RawEntity {
  components: ComponentTypes;
  entityID: string;
}

export function initializeEntity(rawEntity: RawEntity): GameEntity {
  const entity = world.createEntity(rawEntity.entityID);

  Object.keys(rawEntity.components).forEach((componentKey) => {
    const component = componentLookup.getComponent(componentKey);
    if (component) {
      entity.addComponent(
        component,
        rawEntity.components[componentKey as keyof ComponentTypes]
      );
    } else {
      console.log(
        `${componentKey} was not registered because it did not exist`
      );
    }
  });

  entity.addComponent<EntityId>(EntityId, {
    value: rawEntity.entityID,
  });

  return entity as GameEntity;
}
