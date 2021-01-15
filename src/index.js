// @flow
import assert from "assert";
import {
  type ComponentStructType,
  type ComponentType,
  createComponentType,
  getName,
  Component,
  ComponentWithGetters,
} from "./component";

console.group("Opaque type");
// Create a "Component" with opaque flow type + builder + helper functions.
let box1: ComponentType = createComponentType("Box", () => "<div>Box</div>");
console.log("box1:", box1);

// Even though the type is opaque, if you ignore the error you can still grab the underlying data.
// $FlowExpectedError[incompatible-use] - Make sure accessing the private field is an error.
console.log("box1.displayName: ", box1.displayName);
// $FlowExpectedError[incompatible-use] - Make sure accessing the private field is an error.
assert.equal(box1.displayName, "Box");

// Use the helper function to access the "private" field "#displayName" of the "Component" instance.
console.log("getName(box1): ", getName(box1));
assert.equal(getName(box1), "Box");
console.groupEnd();

console.group("Class with private fields and instance helpers");
// Create a "Component" with class + public api functions.
let box2: Component = Component.new("Box", () => "<div>Box</div>");
console.log("box2: ", box2);

// With class private fields, trying to retrieve the private field yields undefined. 
// $FlowExpectedError[prop-missing] - Make sure accessing the private field is an error.
console.log("box2.displayName: ", box2.displayName);
// $FlowExpectedError[prop-missing] - Make sure accessing the private field is an error.
assert.equal(box2.displayName, void 0);

// Use the helper function to access the "private" field "#displayName" of the "Component" instance.
console.log("box2.getName(): ", box2.getName());
assert.equal(box2.getName(), "Box");
console.groupEnd();

console.group("Class with private fields and 'getters'");
// Create a "Component" with class + public getters to get property access style.
let box3: ComponentWithGetters = ComponentWithGetters.new("Box", () => "<div>Box</div>");
console.log("box3:", box3);

// With class private fields, trying to retrieve the private field yields undefined. 
// $FlowExpectedError[prop-missing] - Make sure accessing the private field is an error.
console.log("box3.displayName: ", box3.displayName);
// $FlowExpectedError[prop-missing] - Make sure accessing the private field is an error.
assert.equal(box3.displayName, void 0);

// Use the getter to access the "private" field "#displayName" of the "Component" instance.
console.log("box3.name:", box3.name);
assert.equal(box3.name, "Box");

// And because we used getters we can structural typecheck against the class instance also!
// This can be useful if we wanted to have instances but restrict to data access only in some places.
(box3: ComponentStructType);
console.groupEnd();
