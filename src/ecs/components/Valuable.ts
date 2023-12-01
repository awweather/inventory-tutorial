import { Component, Types } from "ecsy";
class Valuable extends Component<any> {
  value: number = 0;
}
Valuable.schema = {
  value: { type: Types.Number },
};

export default Valuable;
