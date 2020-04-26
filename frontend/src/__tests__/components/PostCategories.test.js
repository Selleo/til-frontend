import React from "react";
import { render } from "@testing-library/react";
import PostCategories from "../../components/PostCategories";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<PostCategories/>", () => {
  let categories = ["One", "Two", "Three"];

  it("renders correctly with categories", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <PostCategories categories={categories} />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("does't render without categories", () => {
    categories = [];
    const { queryAllByTestId } = render(
      <WrapperWithStoreAndRouter>
        <PostCategories categories={categories} />
      </WrapperWithStoreAndRouter>
    );
    const categoryItems = queryAllByTestId("category");

    expect(categoryItems.length).toBe(0);
  });
});
