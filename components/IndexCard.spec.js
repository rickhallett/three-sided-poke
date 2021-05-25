/**
 * @jest-environment jsdom
 */

import "jest";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../pages";

describe("Index page", () => {
  it("should render", () => {
    render(<Index />);
  });

  it("should render n index cards less than RENDER_LIMIT", () => {});
});
