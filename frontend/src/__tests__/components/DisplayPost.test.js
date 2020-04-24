import React from "react";
import { render } from "@testing-library/react";
import DisplayPost from "../../components/DisplayPost";
import { WrapperWithRouter } from "../../utils/test-utils";

describe("<DisplayPost/>", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <WrapperWithRouter>
        <DisplayPost />
      </WrapperWithRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("initializes with `loading` state", () => {
    const { getByText } = render(
      <WrapperWithRouter>
        <DisplayPost />
      </WrapperWithRouter>
    );

    expect(getByText(/loading/i)).toBeInTheDocument();
  });
});
