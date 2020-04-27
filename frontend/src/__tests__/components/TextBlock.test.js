import React from "react";
import { render } from "@testing-library/react";
import TextBlock from "../../components/TextBlock";
import { WrapperWithStore } from "../../utils/test-utils";

describe("<TextBlock/>", () => {
  const textToHighlight = "lorem ipsum dolor sit amet";
  const searchQuery = "lorem";

  it("renders correctly", () => {
    const { container } = render(
      <WrapperWithStore initialState={{ searchQuery }}>
        <TextBlock value={textToHighlight} />
      </WrapperWithStore>
    );

    expect(container).toMatchSnapshot();
  });
});
