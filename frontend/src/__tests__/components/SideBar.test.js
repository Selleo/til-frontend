import React from "react";
import { render } from "@testing-library/react";
import SideBar from "../../components/SideBar";
import { posts } from "../../dummyData";
import { WrapperWithStoreAndRouter } from "../../utils/test-utils";

describe("<SideBar/>", () => {
  const props = {
    post: posts[0],
  };
  it("renders properly", () => {
    const { container } = render(
      <WrapperWithStoreAndRouter>
        <SideBar {...props} />
      </WrapperWithStoreAndRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
