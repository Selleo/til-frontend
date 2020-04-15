import React from "react";
import { render } from "@testing-library/react";
import CopyURL from "../../components/CopyURL";

describe("<CopyURL/>", () => {
  it("renders properly", () => {
    const { asFragment } = render(<CopyURL />);
    expect(asFragment()).toMatchSnapshot();
  });
});
