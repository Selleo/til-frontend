import React from "react";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import Likes from "../../components/Likes";
import { posts, user } from "../../dummyData";

describe("<Likes/>", () => {
  let component;
  let store;
  const props = { post: posts[0] };
  const mockStore = configureMockStore([]);

  beforeEach(() => {
    store = mockStore({
      currentUser: user,
    });

    component = render(
      <Provider store={store}>
        <Likes {...props} />
      </Provider>
    );
  });

  afterEach(cleanup);

  it("renders properly", () => {
    const { asFragment } = component;

    expect(asFragment()).toMatchSnapshot();
  });
});
