/**
 * @jest-environment node
 */

import "jest";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../pages";

describe("Index page", () => {
  it("should render", async () => {
    const response = await Index.getInitialProps();

    console.log(response);

    // function callback(data) {
    //   try {
    //     render(<Index />);
    //     done();
    //   } catch (error) {
    //     console.error(error);
    //     done();
    //   }
    // }

    // fetchData(callback)
  });

  it("should render n index cards less than RENDER_LIMIT", () => {});
});
