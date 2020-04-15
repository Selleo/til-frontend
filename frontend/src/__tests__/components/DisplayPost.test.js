import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import DisplayPost from "../../components/DisplayPost";

describe("<DisplayPost/>", () => {
  const history = createMemoryHistory();

  const component = (
    <Router history={history}>
      <DisplayPost />
    </Router>
  );

  it("renders correctly", () => {
    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  it("initializes with `loading` state", () => {
    const { getByText } = render(component);
    const loadingText = getByText(/loading/i);

    expect(loadingText).toBeInTheDocument();
  });
});
