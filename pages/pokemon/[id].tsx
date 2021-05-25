import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Pokemon } from "../../inferfaces/pokemon.types";
import React from "react";
import { PokemonStats } from "../../components/PokemonStats";
import { PokemonDetailBody } from "../../components/PokemonDetailBody";
import IndexCardHeader from "../../components/IndexCardHeader";
import { LOCAL_URI, REMOTE_URI } from "../../config/config";

const Detail = ({ pokemon }: { pokemon: Pokemon }): JSX.Element => {
  if (!pokemon) {
    return (
      <div>
        No pokemon! Go back to <Link href="/">Index...</Link>
      </div>
    );
  }

  return (
    <div className="bg-white w-1/2 mx-auto sm:w-full flex-col text-center p-1 m-1 border-solid border-4 border-gray-50 rounded-2xl shadow-lg">
      <IndexCardHeader pokemon={pokemon} />
      <PokemonDetailBody pokemon={pokemon} />

      <div className="flex justify-center my-5 sm:mt-2">
        <div className="bg-gray-300 hover:bg-gray-400 text-white text-xs sm:text-base font-bold py-3 sm:py-2 px-2 sm:px-4 rounded ">
          <Link href={pokemon.id === 1 ? "/" : `/pokemon/${pokemon.id - 1}`}>
            Previous
          </Link>
        </div>
        <div className="bg-gray-300 hover:bg-gray-400 text-white text-xs sm:text-base font-bold py-3 sm:py-2 px-2 sm:px-4 ml-5 rounded">
          <Link href={`/pokemon/${pokemon.id + 1}`}>Next</Link>
        </div>
      </div>
    </div>
  );
};

Detail.getInitialProps = async ({ query }) => {
  const response = await axios
    .get(`${LOCAL_URI.GET_POKEMON_BY_ID}?id=${query.id}`)
    .then((response) => response.data.results);

  return { pokemon: response };
};

export default Detail;
