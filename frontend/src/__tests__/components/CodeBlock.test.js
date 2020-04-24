import React from "react";
import { render } from "@testing-library/react";
import CodeBlock from "../../components/CodeBlock";

describe("<CodeBlock/>", () => {
  it("renders properly", () => {
    const { asFragment } = render(<CodeBlock />);

    expect(asFragment()).toMatchSnapshot();
  });
});
