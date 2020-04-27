import React from "react";
import { render } from "@testing-library/react";
import UserPosts from "../../components/UserPosts";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<UserPosts/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <UserPosts />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
