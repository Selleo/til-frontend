import React from "react";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import Categories from "../../components/Categories";
import { categories } from "../../dummyData";

describe("<Categories/>", () => {
  const mockStore = configureMockStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({
      categories,
    });
  });

  afterEach(cleanup);

  it("renders properly", () => {
    store = mockStore({
      categories,
    });
    const { asFragment } = render(
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("when there is no categories provided", () => {
    beforeEach(() => {
      store = mockStore({
        categories: [],
      });
    });

    it("renders empty list", () => {
      const { queryAllByTestId } = render(
        <Provider store={store}>
          <Categories />
        </Provider>
      );
      const items = queryAllByTestId("category-item");

      expect(items.length).toEqual(0);
    });
  });
});
