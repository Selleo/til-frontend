import React from "react";
import { render } from "@testing-library/react";
import PostsList from "../../components/PostsList";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";
import { initialState, posts } from "../../dummyData";

describe("<PostsList/>", () => {
  it("renders properly", () => {
    const { asFragment } = render(
      <WrapperWithStoreAndRouter>
        <PostsList />
      </WrapperWithStoreAndRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("when the posts are provided", () => {
    const state = { ...initialState, posts };

    it("renders list of posts", () => {
      const { getAllByTestId } = render(
        <WrapperWithStoreAndRouter initialState={state}>
          <PostsList />
        </WrapperWithStoreAndRouter>
      );

      expect(getAllByTestId("post-component").length).toEqual(2);
    });
  });
});
