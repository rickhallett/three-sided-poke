import { debug, LOCAL_STORAGE } from "../config/config";

export const printLocalStorage = (msg) => {
  if (debug.console) {
    console.log(
      msg,
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.FAVOURITES))
    );
  }
};
