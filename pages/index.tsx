import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { Pokemon, PokemonRef } from "../types/pokemon.types";
import IndexCard from "../components/IndexCard";

const Index = ({ pokemon }): JSX.Element => {
  const [allPokemonData, setAllData] = useState(pokemon);
  const [filteredPokemonData, setFilteredData] = useState(allPokemonData);
  const [searchActive, setSearchActive] = useState(false);
  const [generationFilter, setGenerationFilter] = useState([]);
  const [renderLimit, setRenderLimit] = useState(5);

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
    console.log(event.target.value);

    const pokemonByGeneration = await axios.get(
      `${generations.find((gen) => gen.name === event.target.value).url}`
    );

    // debugger;
    // console.log(pokemonByGeneration.data.pokemon_species);

    await setAllData(pokemonByGeneration.data.pokemon_species);
    await setFilteredData(pokemonByGeneration.data.pokemon_species);
  };

  const onRenderLimitChange = async (event) => {
    // const response = await axios.post(
    //   `http://localhost:3000/api/getPokemon?limit=${event.target.value}`
    // );
    // console.log(response);
    setRenderLimit(event.target.value);
  };

  const generations = [
    {
      name: "Choose a generation..",
      url: "https://pokeapi.co/api/v2/generation/1/",
    },
    {
      name: "generation-i",
      url: "https://pokeapi.co/api/v2/generation/1/",
    },
    {
      name: "generation-ii",
      url: "https://pokeapi.co/api/v2/generation/2/",
    },
    {
      name: "generation-iii",
      url: "https://pokeapi.co/api/v2/generation/3/",
    },
    {
      name: "generation-iv",
      url: "https://pokeapi.co/api/v2/generation/4/",
    },
    {
      name: "generation-v",
      url: "https://pokeapi.co/api/v2/generation/5/",
    },
    {
      name: "generation-vi",
      url: "https://pokeapi.co/api/v2/generation/6/",
    },
    {
      name: "generation-vii",
      url: "https://pokeapi.co/api/v2/generation/7/",
    },
    {
      name: "generation-viii",
      url: "https://pokeapi.co/api/v2/generation/8/",
    },
  ];

  return (
    <div>
      <div className="flex justify-center mx-auto text-gray-600 m-5">
        <input
          className="border-2 border-gray-300 hover:border-gray-400 bg-white h-10 px-5 pr-2 mr-1 rounded-full text-sm focus:outline-none"
          type="number"
          name="limit"
          min={0}
          placeholder="Render limit"
          width="10px"
          onChange={(event) => onRenderLimitChange(event)}
        ></input>
        <input
          className="border-2 border-gray-300 hover:border-gray-400 bg-white h-10 px-5 pr-16 mr-1 rounded-full text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search by name..."
          onChange={(event) => onSearchInput(event)}
        ></input>
        <div className="relative inline-flex">
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
            className="border-2 border-gray-300 rounded-full text-gray-400 h-10 pl-5 pr-10 bg-white text-sm hover:border-gray-400 focus:outline-none appearance-none"
            // onSelect={(event) => handleGenerationSelect(event)}
            onInput={(event) => handleGenerationSelect(event)}
          >
            {generations.map((generation, i) => (
              <option key={generation.name + i}>{generation.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-around mt-5">
        {filteredPokemonData.map((pokemon: PokemonRef, i: number) => {
          // TODO: implement render guard
          // if (!pokemon) {
          //   return (
          //     <div className="text-center p-1 m-1 border-solid border-4 border-gray-50 rounded-2xl shadow-lg hover:border-gray-100 hover:bg-gray-100">?<div>
          //   )
          // }
          return i < renderLimit ? (
            <IndexCard
              key={i + pokemon.name}
              name={pokemon.name}
              id={pokemon.url.split("/")[6]}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

Index.getInitialProps = async () => {
  const response = await axios
    .get("http://localhost:3000/api/getPokemon")
    .then((response) => response.data.raw);

  return { pokemon: response.results };
};

export default Index;
