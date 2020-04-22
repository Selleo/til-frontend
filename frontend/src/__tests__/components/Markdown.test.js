import React from "react";
import { render } from "@testing-library/react";
import Markdown from "../../components/Markdown";
import { WrapperWithStore } from "../../utils/test-utils.js";

describe("<Markdown/>", () => {
  it("renders properly", () => {
    const { asFragment } = render(
      <WrapperWithStore>
        <Markdown />
      </WrapperWithStore>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
