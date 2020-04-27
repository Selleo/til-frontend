import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Search from "../../components/Search";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<Search/>", () => {
  let component;

  beforeEach(() => {
    component = render(
      <WrapperWithStoreAndRouter>
        <Search />
      </WrapperWithStoreAndRouter>
    );
  });

  afterEach(cleanup);

  it("renders correctly", () => {
    const { container } = component;

    expect(container).toMatchSnapshot();
  });

  it("shows search query in input", () => {
    const { getByPlaceholderText } = component;
    const input = getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "react" } });
    expect(input.value).toBe("react");
  });
});
