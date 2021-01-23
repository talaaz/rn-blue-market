import React from "react";
import renderer from "react-test-renderer";
import UserProductsScreen from "../../screens/UserProductsScreen";

jest.useFakeTimers();
describe("<UserProductsScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<UserProductsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
