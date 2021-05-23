import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { PokemonRef } from "../types/pokemon.types";
import IndexCard from '../components/IndexCard';
import { prependOnceListener } from 'process';

const Index = ({ pokemon }): JSX.Element => {
  const [allPokemonData, setAllData] = useState(pokemon);
  const [filteredPokemonData, setFilteredData] = useState(allPokemonData);

  const onSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredData(
      allPokemonData.filter((item) =>
        item.name.search(event.target.value.toLowerCase()) !== -1
      )
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
        {filteredPokemonData.map((pokemon: PokemonRef, i: number) => {
          if (i < 50 && pokemon.name && pokemon.url) {
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



