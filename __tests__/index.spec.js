/**
 * @jest-environment jsdom
 */

import "jest";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    xit("should change the number of rendered index cards if the user changes the render limit", async () => {});

    it("should change the number of rendered index cards if the user types in the search bar", async () => {
      const props = await Index.getInitialProps();

      if (props) {
        render(
          <Index pokemon={props.pokemon} generations={props.generations} />
        );

        const cardsBeforeSearch = await screen.findAllByTestId("pokemon-name");
        userEvent.type(screen.getByPlaceholderText("Search by name..."), "a");
        const cardsAfterSearch = await screen.findAllByTestId("pokemon-name");

        expect(cardsAfterSearch.length).toBeLessThan(cardsBeforeSearch.length);
      }
    });

    xit("if the user types in the search bar only pokemon names that partially match the search string should show", async () => {});
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
