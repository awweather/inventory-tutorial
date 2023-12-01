import { Component, Types } from "ecsy";

class EntityId extends Component<any> {
  value: string = "";
}
EntityId.schema = {
  value: { type: Types.String },
};

export default EntityId;
