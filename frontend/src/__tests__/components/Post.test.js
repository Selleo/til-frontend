import React from "react";
import { render } from "@testing-library/react";
import Post from "../../components/Post";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";
import { posts } from "../../dummyData";

describe("<Post/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <Post post={posts[0]} />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
