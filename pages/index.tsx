import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pokemon, PokemonRef } from "../inferfaces/pokemon.types";
import IndexCard from "../components/IndexCard";
import { LOCAL_STORAGE, LOCAL_URI, REMOTE_URI } from "../config/config";

const Index = ({ pokemon, generations }): JSX.Element => {
  const [allPokemonData, setAllData] = useState<PokemonRef[]>(pokemon);
  const [filteredPokemonData, setFilteredData] =
    useState<PokemonRef[]>(allPokemonData);
  const [renderLimit, setRenderLimit] = useState(20);

  const onSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = event.target.value.toLowerCase();

    setFilteredData(
      allPokemonData
        .filter((item: PokemonRef) => item.name.search(searchVal) !== -1)
        .sort((a: PokemonRef, b: PokemonRef) =>
          parseInt(a.url.split("/")[6]) > parseInt(b.url.split("/")[6]) ? 1 : -1
        )
    );
  };

  const handleGenerationSelect = async (event: any) => {
    const pokemonByGeneration = await axios.get(
      `${generations.find((gen) => gen.name === event.target.value).url}`
    );

    setFilteredData(
      pokemonByGeneration.data.pokemon_species ||
        pokemonByGeneration.data.results
    );
  };

  const onRenderLimitChange = async (event) =>
    setRenderLimit(event.target.value);

  useEffect(() => {
    const favouritesStore = window.localStorage.getItem(
      LOCAL_STORAGE.FAVOURITES
    );
    if (!favouritesStore) {
      window.localStorage.setItem(LOCAL_STORAGE.FAVOURITES, JSON.stringify([]));
    }
  }, []);

  return (
    <div>
      <div className="flex-col sm:flex-row sm:justify-center text-center mx-auto text-gray-600 m-5">
        <input
          className="block sm:inline-block w-full sm:w-auto border-2 border-gray-300 hover:border-gray-400 bg-white h-10 px-5 pr-2 mr-1 rounded-full text-sm focus:outline-none"
          type="number"
          name="limit"
          min={0}
          placeholder="Render limit"
          width="10px"
          onChange={(event) => onRenderLimitChange(event)}
          data-testid="render-limit"
          defaultValue={20}
        ></input>
        <input
          className="block sm:inline-block w-full sm:w-auto border-2 border-gray-300 hover:border-gray-400 bg-white h-10 px-5 pr-16 mr-1 rounded-full text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search by name..."
          onChange={(event) => onSearchInput(event)}
        ></input>
        <div className="sm:relative sm:inline-flex">
          <svg
            className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fillRule="nonzero"
            />
          </svg>
          <select
            className="block sm:inline-block w-full sm:w-auto border-2 border-gray-300 rounded-full text-gray-400 h-10 pl-5 pr-10 bg-white text-sm hover:border-gray-400 focus:outline-none appearance-none"
            onInput={(event) => handleGenerationSelect(event)}
          >
            {generations.map((generation, i) => (
              <option key={generation.name + i}>{generation.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-around mt-5">
        {filteredPokemonData && filteredPokemonData.length > 0
          ? filteredPokemonData.map((pokemon: PokemonRef, i: number) => {
              // i < renderLimit
              //   ? console.log("pass in this to IndexCard...", pokemon)
              //   : null;
              return i < renderLimit ? (
                <IndexCard
                  key={i + pokemon.name}
                  name={pokemon.name}
                  id={pokemon.url.split("/")[6]}
                  // updateFilter={updateFilteredPokemon}
                />
              ) : null;
            })
          : null}
      </div>
    </div>
  );
};

Index.getInitialProps = async () => {
  let pokemonData = await axios
    .get(REMOTE_URI.GET_POKEMON)
    .then((response) => response.data.results);

  pokemonData = pokemonData.results ? pokemonData.results : pokemonData;

  const generations = await axios
    .get(REMOTE_URI.GET_GENERATIONS)
    .then((response) => response.data.results);

  generations.unshift({
    name: "Choose a generation...",
    url: REMOTE_URI.GET_POKEMON,
  });

  return { pokemon: pokemonData, generations };
};

export default Index;
