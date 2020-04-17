import React from "react";
import { render } from "@testing-library/react";
import RandomPost from "../../components/RandomPost";

describe("<RandomPost/>", () => {
  it("renders properly", () => {
    const { asFragment } = render(<RandomPost />);

    expect(asFragment()).toMatchSnapshot();
  });
});
