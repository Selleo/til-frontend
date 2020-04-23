import React from "react";
import { render } from "@testing-library/react";
import AuthenticatedApp from "../../authenticated/";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<AuthenticatedApp/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <AuthenticatedApp />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
