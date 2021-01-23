import React from "react";
import renderer from "react-test-renderer";
import PaymentScreen from "../../screens/PaymentScreen";

jest.useFakeTimers();
describe("<PaymentScreen />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<PaymentScreen navigation={{ getParam: jest.fn() }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
