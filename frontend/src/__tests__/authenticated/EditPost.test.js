import React from "react";
import { render } from "@testing-library/react";
import EditPost from "../../authenticated/EditPost";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<EditPost/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <EditPost />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
