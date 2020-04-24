import React from "react";
import { render } from "@testing-library/react";
import ProfilePosts from "../../authenticated/ProfilePosts";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";
import { posts, user } from "../../dummyData";

describe("<ProfilePosts/>", () => {
  const state = { currentUser: user };

  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter initialState={state}>
        <ProfilePosts post={posts[0]} />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
