import React from "react";
import { render } from "@testing-library/react";
import DeletePost from "../../authenticated/DeletePost";
import { WrapperWithStore } from "../../utils/test-utils";
import { user } from "../../dummyData";

describe("<DeletePost/>", () => {
  const state = { currentUser: user };

  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStore initialState={state}>
        <DeletePost />
      </WrapperWithStore>
    );

    expect(container).toMatchSnapshot();
  });
});
