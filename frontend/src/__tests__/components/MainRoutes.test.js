import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureMockStore from "redux-mock-store";
import { render, cleanup } from "@testing-library/react";
import MainRoutes from "../../components/MainRoutes";
import { initialState } from "../../dummyData";

describe("<MainRoutes/>", () => {
  let component;
  let store;
  const history = createMemoryHistory();
  const mockStore = configureMockStore([]);

  beforeEach(() => {
    store = mockStore(initialState);

    component = render(
      <Provider store={store}>
        <Router history={history}>
          <MainRoutes />
        </Router>
      </Provider>
    );
  });

  afterEach(cleanup);

  it("renders properly", () => {
    const { asFragment } = component;

    expect(asFragment()).toMatchSnapshot();
  });
});
