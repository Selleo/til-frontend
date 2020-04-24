import React from "react";
import { render } from "@testing-library/react";
import UserProfile from "../../authenticated/UserProfile";
import { WrapperWithStore } from "../../utils/test-utils";

describe("<UserProfile/>", () => {
  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStore>
        <UserProfile />
      </WrapperWithStore>
    );

    expect(container).toMatchSnapshot();
  });
});
