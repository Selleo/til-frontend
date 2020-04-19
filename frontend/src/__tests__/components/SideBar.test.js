import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";
import SideBar from "../../components/SideBar";
import { initialState, posts } from "../../dummyData";

describe("<SideBar/>", () => {
  const history = createMemoryHistory();
  const mockStore = configureMockStore([]);
  const store = mockStore(initialState);
  const props = {
    post: posts[0],
  };
  it("renders properly", () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <SideBar {...props} />
        </Router>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
