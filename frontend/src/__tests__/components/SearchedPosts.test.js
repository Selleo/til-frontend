import React from "react";
import { render } from "@testing-library/react";
import SearchedPosts from "../../components/SearchedPosts";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";
import { posts as searchedPosts } from "../../dummyData";

describe("<SearchedPosts/>", () => {
  it("renders correctly with posts", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter initialState={{ searchedPosts }}>
        <SearchedPosts />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("returns `nothing found` when no posts founded", () => {
    const { getByText } = render(
      <WrapperWithStoreAndRouter initialState={{ searchedPosts: [] }}>
        <SearchedPosts />
      </WrapperWithStoreAndRouter>
    );
    const message = getByText(/nothing found/i);

    expect(message).toBeInTheDocument();
  });
});
