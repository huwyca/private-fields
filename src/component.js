// @flow

export type ComponentStructType = {
  +name: string,
  +render: () => string,
};

export opaque type ComponentType = {
  displayName: string;
  render: () => string;
};

export function createComponentType(displayName: string, render: () => string): ComponentType {
  return { displayName, render };
}

export function getName(component: ComponentType): string {
  return component.displayName;
}

export class Component {
  #displayName: string;
  #render: () => string;

  static new(displayName: string, render: () => string): Component {
    return new Component(displayName, render);
  }

  constructor(displayName: string, render: () => string) {
    this.#displayName = displayName;
    this.#render = render;
  }

  getName(): string {
    return this.#displayName;
  }

  getRender(): () => string {
    return this.#render;
  }
}

export class ComponentWithGetters {
  #displayName: string;
  #render: () => string;

  static new(displayName: string, render: () => string): ComponentWithGetters {
    return new ComponentWithGetters(displayName, render);
  }

  constructor(displayName: string, render: () => string) {
    this.#displayName = displayName;
    this.#render = render;
  }

  get name(): string {
    return this.#displayName;
  }

  get render(): () => string {
    return this.#render;
  }
}
