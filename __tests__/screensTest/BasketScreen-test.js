import React from "react";
import renderer from "react-test-renderer";
import BasketScreen from "../../screens/BasketScreen";

jest.useFakeTimers();
describe("<BasketScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<BasketScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
