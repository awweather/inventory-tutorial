import { Component, Types } from "ecsy";
class PickedUp extends Component<any> {
  slotIndex: number = 0;
}
PickedUp.schema = {
  slotIndex: { type: Types.Number },
};

export default PickedUp;
