import React from "react";
import renderer from "react-test-renderer";
import SellProductScreen from "../../screens/SellProductScreen";

jest.useFakeTimers();
describe("<SellProductScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SellProductScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
