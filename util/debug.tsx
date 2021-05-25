import { debug } from "../config/config";

export const printLocalStorage = (msg) => {
  if (debug.console) {
    console.log(
      msg,
      JSON.parse(window.localStorage.getItem("three-sided-pokedex:favourites"))
    );
  }
};
