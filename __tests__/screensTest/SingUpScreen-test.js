import React from "react";
import renderer from "react-test-renderer";
import SignUpScreen from "../../screens/SignUpScreen";

jest.useFakeTimers();
describe("<SignUpScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SignUpScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
