import React from "react";
import { render, cleanup } from "@testing-library/react";
import Modal from "react-modal";
import DeleteModal from "../../authenticated/DeleteModal";

describe("<DeleteModal/>", () => {
  beforeEach(() => {
    const modalContainer = document.createElement("div");
    modalContainer.id = "root";
    document.body.appendChild(modalContainer);

    Modal.setAppElement(modalContainer);
  });

  afterEach(cleanup);

  it("renders correctly", () => {
    const { container } = render(<DeleteModal />);

    expect(container).toMatchSnapshot();
  });
});
