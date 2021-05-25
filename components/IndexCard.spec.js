/**
 * @jest-environment jsdom
 */

import "jest";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../pages";

describe("Index page", () => {
  it("should render", async () => {
    let response;
    try {
      response = await Index.getInitialProps();
      if (response) {
        console.log(response);
        render(
          <Index
            pokemon={response.pokemon}
            generations={response.generations}
          />
        );
      }
    } catch (error) {
      console.error(error);
    }
  });

  it("should render n index cards less than RENDER_LIMIT", () => {});
});
