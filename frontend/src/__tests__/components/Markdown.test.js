import React from "react";
import { render } from "@testing-library/react";
import Markdown from "../../components/Markdown";

describe("<Markdown/>", () => {
  it("renders properly", () => {
    const { asFragment } = render(<Markdown />);

    expect(asFragment()).toMatchSnapshot();
  });
});
