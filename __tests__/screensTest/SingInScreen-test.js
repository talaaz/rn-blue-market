import React from "react";
import renderer from "react-test-renderer";
import SingInScreen from "../../screens/SignInScreen";

jest.useFakeTimers();
describe("<SingInScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SingInScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
