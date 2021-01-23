import React from "react";
import renderer from "react-test-renderer";

import ProductDetailsScreen from "../../screens/ProductDetailsScreen";
import { Provider } from "react-redux";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createStore } from "redux";
import productReducer from "../../store/reducers/products";

const store = createStore(productReducer);
configure({ adapter: new Adapter() });

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);
jest.mock();
jest.useFakeTimers();
describe("<ProductDetailsScreen />", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ProductDetailsScreen />
      </Provider>
    );
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
