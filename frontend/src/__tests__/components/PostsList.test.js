import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";
import PostsList from "../../components/PostsList";
import { initialState, posts } from "../../dummyData";

describe("<PostsList/>", () => {
  const history = createMemoryHistory();
  const mockStore = configureMockStore([]);
  let store = mockStore(initialState);

  it("renders properly", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <PostsList />
        </Router>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("when the posts are provided", () => {
    store = mockStore({ ...initialState, posts });

    it("renders list of posts", () => {
      const { getAllByTestId } = render(
        <Provider store={store}>
          <Router history={history}>
            <PostsList />
          </Router>
        </Provider>
      );

      expect(getAllByTestId("post-component").length).toEqual(2);
    });
  });
});
