import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, cleanup } from "@testing-library/react";
import DisplayPost from "../../components/DisplayPost";

describe("<DisplayPost/>", () => {
  let component;
  const history = createMemoryHistory();

  beforeEach(() => {
    component = render(
      <Router history={history}>
        <DisplayPost />
      </Router>
    );
  });

  afterEach(cleanup);

  it("renders correctly", () => {
    const { asFragment } = component;

    expect(asFragment()).toMatchSnapshot();
  });

  it("initializes with `loading` state", () => {
    const { getByTestId } = component;
    const loadingText = getByTestId("loading");

    expect(loadingText).toBeInTheDocument();
  });
});
