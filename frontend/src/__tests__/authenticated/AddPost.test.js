import React from "react";
import { render } from "@testing-library/react";
import AddPost from "../../authenticated/AddPost";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<AddPost/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <AddPost />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
