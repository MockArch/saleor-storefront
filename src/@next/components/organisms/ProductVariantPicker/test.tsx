import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { components } from "react-select";

import { ProductVariantPicker } from ".";
import { productVariants } from "./fixtures";

const PROPS = { onChange: jest.fn(), productVariants };

describe("<ProductVariantPicker />", () => {
  it("exists", () => {
    const wrapper = mount(<ProductVariantPicker {...PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should disable possible selection of other variant attributes after selection of one variant attribute", () => {
    const wrapper = mount(<ProductVariantPicker {...PROPS} />);

    wrapper
      .find("input")
      .at(0)
      .simulate("focus");
    wrapper
      .find(components.Option)
      .at(1)
      .simulate("click");

    expect(wrapper.text()).toContain("wool");

    wrapper
      .find("input")
      .at(1)
      .simulate("focus");
    expect(
      wrapper
        .find(components.Option)
        .at(0)
        .prop("isDisabled")
    ).toBe(true);
    expect(
      wrapper
        .find(components.Option)
        .at(1)
        .prop("isDisabled")
    ).toBe(false);
    expect(
      wrapper
        .find(components.Option)
        .at(2)
        .prop("isDisabled")
    ).toBe(true);
  });
});