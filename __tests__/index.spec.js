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

    xit("should render with props", async () => {
      let response;
      try {
        response = await Index.getInitialProps();
        if (response) {
          render(
            <Index
              pokemon={response.pokemon}
              generations={response.generations}
            />
          );
          // done();
        }
      } catch (error) {
        console.error(error);
      }

      // await waitFor(() => screen.findAllByText("#"));

      expect(screen.findAllByText("#").length).toBe(20);
    });

    xit("should render n index cards less than RENDER_LIMIT", () => {
      render(<Index pokemon={[]} generations={[]} />);
      screen.debug();
      expect(2).toBe(2);
    });
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
