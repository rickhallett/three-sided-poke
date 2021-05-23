import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { Pokemon, PokemonRef } from "../types/pokemon.types";
import IndexCard from '../components/IndexCard';

const Index = ({ pokemon }): JSX.Element => {
  const [allPokemonData, setAllData] = useState(pokemon);
  const [filteredPokemonData, setFilteredData] = useState(allPokemonData);
  const [searchActive, setSearchActive] = useState(false);

  const onSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = event.target.value.toLowerCase();
    setSearchActive(searchVal.length > 0);
    setFilteredData(
      allPokemonData.filter((item: Pokemon) =>
        item.name.search(searchVal) !== -1
      ).sort((a: Pokemon, b: Pokemon) => a.id < b.id ? 1 : -1)
    );
  };

  return (
    <div>
      Pokedex
      <input
        style={{ display: "block" }}
        type="text"
        onChange={(event) => onSearchInput(event)}
        placeholder="Search"
      />
      <hr />
      <div className="flex flex-wrap">
        {(searchActive ? filteredPokemonData : allPokemonData).map((pokemon: PokemonRef, i: number) => {
          if (true || i < 50 && pokemon.name && pokemon.url) {
            return (
              <IndexCard
                key={i}
                name={pokemon.name}
                id={pokemon.url.split("/")[6]}
              />
            );
          }
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



