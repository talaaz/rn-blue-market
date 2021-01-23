import React from "react";
import renderer from "react-test-renderer";
import MapScreen from "../../screens/MapScreen";

jest.useFakeTimers();
describe("<MapScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<MapScreen navigation={{ getParam: jest.fn() }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
