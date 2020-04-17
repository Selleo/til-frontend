import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";
import Post from "../../components/Post";
import { initialState, posts } from "../../dummyData";

describe("<Post/>", () => {
  const history = createMemoryHistory();
  const mockStore = configureMockStore([]);
  const store = mockStore(initialState);
  const props = {
    post: posts[0],
  };
  it("renders properly", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router history={history}>
          <Post {...props} />
        </Router>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
