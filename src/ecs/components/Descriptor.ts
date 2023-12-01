import { Component, Types } from "ecsy";

class Descriptor extends Component<any> {
  description: string = "";
  name: string = "";
}
Descriptor.schema = {
  description: { type: Types.String },
  name: { type: Types.String },
};

export default Descriptor;
