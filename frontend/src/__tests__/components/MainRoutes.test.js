import React from "react";
import { render } from "@testing-library/react";
import MainRoutes from "../../components/MainRoutes";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<MainRoutes/>", () => {
  it("renders properly", () => {
    const { asFragment } = render(
      <WrapperWithStoreAndRouter>
        <MainRoutes />
      </WrapperWithStoreAndRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
