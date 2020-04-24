import React from "react";
import { render } from "@testing-library/react";
import NonAuthenticatedApp from "../../nonAuthenticated";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<NonAuthenticatedApp/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <NonAuthenticatedApp />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
