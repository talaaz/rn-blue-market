import React from "react";
import renderer from "react-test-renderer";

import ProductsScreen from "../../screens/ProductsScreen";
jest.useFakeTimers();
describe("<ProductsScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ProductsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
