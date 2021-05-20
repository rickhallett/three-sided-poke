import Pokedex from "pokedex-promise-v2";

const poker = new Pokedex({
  cacheLimit: 1000 * 3600, // 1hr
  timeout: 1000 * 5,
});

export default poker;
