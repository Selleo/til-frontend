import React from "react";
import { render } from "@testing-library/react";
import ReviewPost from "../../authenticated/ReviewPost";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<ReviewPost/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <ReviewPost />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
