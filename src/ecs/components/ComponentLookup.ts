import { ComponentConstructor } from "ecsy";
import { ComponentTypes, components } from "./Components.ts";

class ComponentLookup {
  private indexedComponents: Map<string, ComponentConstructor<any>>;
  constructor() {
    this.indexedComponents = new Map<string, ComponentConstructor<any>>();
    Object.keys(components).forEach((componentKey) => {
      this.indexedComponents.set(
        componentKey.toLowerCase(),
        components[componentKey as keyof ComponentTypes]
      );
    });
  }

  getComponent(componentKey: string) {
    return this.indexedComponents.get(componentKey.toLowerCase());
  }
}

export const componentLookup = new ComponentLookup();
