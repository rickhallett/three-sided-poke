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

  return (
    <div>
      <div className="flex justify-center mx-auto text-gray-600 m-5">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 mr-1 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          onChange={(event) => onSearchInput(event)}
        ></input>
        <button type="submit" className="text-gray-600">
          <svg
            className="text-gray-300 h-8 w-6 fill-current"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap justify-around mt-5">
        {filteredPokemonData.map((pokemon: PokemonRef, i: number) => {
          // TODO: implement render guard
          // if (!pokemon) {
          //   return (
          //     <div className="text-center p-1 m-1 border-solid border-4 border-gray-50 rounded-2xl shadow-lg hover:border-gray-100 hover:bg-gray-100">?<div>
          //   )
          // }
          return (
            <IndexCard
              key={i + pokemon.name}
              name={pokemon.name}
              id={pokemon.url.split("/")[6]}
            />
          );
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
