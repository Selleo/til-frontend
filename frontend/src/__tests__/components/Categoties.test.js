import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import Categories from "../../components/Categories";

const categories = [
  {
    id: 1,
    name: "android",
  },
  {
    id: 2,
    name: "angular",
  },
  {
    id: 3,
    name: "aws",
  },
  {
    id: 4,
    name: "chrome",
  },
  {
    id: 5,
    name: "commandline",
  },
  {
    id: 6,
    name: "crystal",
  },
];

describe("<Categories/>", () => {
  it("renders properly", () => {
    const mockStore = configureMockStore([]);
    const store = mockStore({
      categories,
    });

    const component = (
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders empty list when zero categories provided", () => {
    const mockStore = configureMockStore([]);

    const store = mockStore({
      categories: [],
    });

    const component = (
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    const { queryAllByTestId } = render(component);

    const items = queryAllByTestId("category-item");

    expect(items.length).toEqual(0);
  });

  it("renders list with correct names when categories provided", () => {
    const mockStore = configureMockStore([]);

    const store = mockStore({
      categories,
    });

    const component = (
      <Provider store={store}>
        <Categories />
      </Provider>
    );

    const { queryAllByTestId } = render(component);

    const categoryNames = queryAllByTestId("category-item").map(
      (item) => item.textContent
    );

    const fakeCaregoryNames = categories.map((category) => category.name);
    expect(categoryNames).toEqual(fakeCaregoryNames);
  });
});
