import React from "react";
import { render } from "@testing-library/react";
import AdminPanel from "../../authenticated/AdminPanel";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<AdminPanel/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <AdminPanel />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
