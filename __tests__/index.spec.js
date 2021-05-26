/**
 * @jest-environment jsdom
 */

import "jest";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Index from "../pages";

describe("Pages", () => {
  describe("Index", () => {
    it("should render with empty prop arrays", () => {
      render(<Index pokemon={[]} generations={[]} />);
      expect(screen.getAllByPlaceholderText("Render limit").length).toBe(1);
    });

    it("should render with props", async () => {
      const props = await Index.getInitialProps();

      if (props) {
        render(
          <Index pokemon={props.pokemon} generations={props.generations} />
        );

        const cards = await screen.findAllByText("bulbasaur");
        expect(cards.length).toBe(1);
      }
    });

    it("should render n index cards less than RENDER_LIMIT", async () => {
      const props = await Index.getInitialProps();

      if (props) {
        render(
          <Index pokemon={props.pokemon} generations={props.generations} />
        );

        const cards = await screen.findAllByTestId("pokemon-name");
        expect(cards.length).toBe(20);
      }
    });

    it("should change the number of rendered index cards if the user changes the render limit", async () => {});
  });
});

xdescribe("Components", () => {
  xdescribe("IndexCard", () => {
    xit("", async () => {
      throw new Error("Test not implemented");
    });

    xit("", async () => {
      expect(true).toBe(false);
    });

    xit("", async () => {
      expect(true).toBe(false);
    });

    xit("", async () => {
      expect(true).toBe(false);
    });

    xit("", async () => {
      expect(true).toBe(false);
    });
  });
});
