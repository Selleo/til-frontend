import React from "react";
import { render } from "@testing-library/react";
import Stats from "../../components/Stats";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<Stats/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <Stats />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
