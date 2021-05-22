import Head from "next/head";
import Link from 'next/link';
import axios from "axios";
import React from 'react';

type Pokemon = {
  name: string;
};

const Index = ({ pokemon }): JSX.Element => {
  return (
    <div>
      Hello, Pokedex!
      {pokemon.map((pokemon: Pokemon, i: number) => {
        return (
          <div>
            <Link href={`/pokemon/${i + 1}`}>
              <a key={i}>{i + 1}:{pokemon.name}</a>
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
