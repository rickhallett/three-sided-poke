import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { Pokemon } from "../types/pokemon.types";

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
        style={{display: 'block'}}
        type="text"
        onChange={(event) => onSearchInput(event)}
        placeholder="Search"
      />
      <hr />
      {filteredPokemonData.map((pokemon: Pokemon, i: number) => {
        return (
          <div key={i}>
            <Link href={`/pokemon/${i + 1}`}>
              <a>
                {i + 1}:{pokemon.name}
              </a>
            </Link>
          </div>
        );
      })}
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
