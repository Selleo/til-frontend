import React from "react";
import { render } from "@testing-library/react";
import Logout from "../../authenticated/Logout";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<Logout/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <Logout />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
