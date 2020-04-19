import React from "react";
import { render } from "@testing-library/react";
import ReactionBar from "../../components/ReactionBar";
import { WrapperWithStore } from "../../utils/test-utils";
import { posts } from "../../dummyData";

describe("<ReactionBar/>", () => {
  it("renders correctly", () => {});

  const { container } = render(
    <WrapperWithStore>
      <ReactionBar post={posts[0]} />
    </WrapperWithStore>
  );

  expect(container).toBeInTheDocument();
});
