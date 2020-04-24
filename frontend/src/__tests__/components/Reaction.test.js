import React from "react";
import { render } from "@testing-library/react";
import Reaction from "../../components/Reaction";
import { WrapperWithStore } from "../../utils/test-utils";
import { initialState, posts, user } from "../../dummyData";

describe("<Reaction/>", () => {
  const reaction = posts[0].reactions[0];
  const props = { post: posts[0], reaction };
  const state = { ...initialState, currentUser: user, posts };

  it("renders properly", () => {
    const { asFragment } = render(
      <WrapperWithStore initialState={state}>
        <Reaction {...props} />
      </WrapperWithStore>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
