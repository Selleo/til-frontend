import React from "react";
import { render } from "@testing-library/react";
import Likes from "../../components/Likes";
import { WrapperWithStore } from "../../utils/test-utils";
import { posts, user } from "../../dummyData";

describe("<Likes/>", () => {
  const props = { post: posts[0] };
  const state = {
    currentUser: user,
  };

  it("renders properly", () => {
    const { asFragment } = render(
      <WrapperWithStore initialState={state}>
        <Likes {...props} />
      </WrapperWithStore>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
