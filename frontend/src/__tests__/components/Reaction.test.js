import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import Reaction from "../../components/Reaction";
import { initialState, posts, user } from "../../dummyData";

describe("<Reaction/>", () => {
  const reaction = posts[0].reactions[0];
  const props = { post: posts[0], reaction };
  const mockStore = configureMockStore([]);
  const store = mockStore({ ...initialState, currentUser: user, posts });

  it("renders properly", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Reaction {...props} />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
