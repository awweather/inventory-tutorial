import { Component, Types } from "ecsy";

class Quantity extends Component<any> {
  value: number = 0;
  maxValue?: number;
}

Quantity.schema = {
  value: { type: Types.Number },
  maxValue: { type: Types.Number },
};

export default Quantity;
