import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import configureMockStore from "redux-mock-store";
import { initialState as defaultState } from "../dummyData";

export const WrapperWithStoreAndRouter = ({
  children,
  initialState = defaultState,
}) => {
  const history = createMemoryHistory();
  const mockStore = configureMockStore([]);
  const store = mockStore(initialState);

  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};
export const WrapperWithStore = ({ children, initialState = defaultState }) => {
  const mockStore = configureMockStore([]);
  const store = mockStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};

export const WrapperWithRouter = ({ children }) => {
  const history = createMemoryHistory();

  return <Router history={history}>{children}</Router>;
};
