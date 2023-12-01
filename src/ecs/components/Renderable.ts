import { Component, Types } from "ecsy";
interface Sprite {
  height: number;
  width: number;
  texture: string;
  frame: string;
}

class Renderable extends Component<any> {
  sprite: Sprite;

  constructor() {
    super();

    this.sprite = {
      height: 0,
      width: 0,
      frame: "",
      texture: "",
    };
  }
}

Renderable.schema = {
  sprite: { type: Types.Ref },
};

export default Renderable;
