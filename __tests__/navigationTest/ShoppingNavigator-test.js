import React from "react";
import renderer from "react-test-renderer";
import ShoppingNavigator from "../../navigation/ShoppingNavigator";

jest.useFakeTimers();
describe("<ShoppingNavigator />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ShoppingNavigator />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
