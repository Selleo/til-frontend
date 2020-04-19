import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render } from "@testing-library/react";
import ReactionBar from "../../components/ReactionBar";
import { initialState, posts } from "../../dummyData";

describe("<ReactionBar/>", () => {
  const mockStore = configureMockStore([]);
  const store = mockStore({ ...initialState });

  it("renders correctly", () => {});

  const { container } = render(
    <Provider store={store}>
      <ReactionBar post={posts[0]} />
    </Provider>
  );

  expect(container).toBeInTheDocument();
});
