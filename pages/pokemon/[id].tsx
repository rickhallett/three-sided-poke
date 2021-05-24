import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Pokemon } from "../../types/pokemon.types";
import React from "react";

const Detail = ({ pokemon }: { pokemon: Pokemon }): JSX.Element => {
  if (!pokemon) {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
    return <div>No pokemon! Redirecting back to Index...</div>;
  }

  return (
    <React.Fragment>
      <div className="w-1/2 mx-auto sm:w-full flex-col text-center p-1 m-1 border-solid border-4 border-gray-50 rounded-2xl shadow-lg hover:border-gray-100 hover:bg-gray-100">
        <div className="flex w-full justify-between p-3">
          <div className="text-base sm:text-3xl text-gray-600 tracking-wider">
            {pokemon.name}
          </div>
          <div className="text-3xl font-bold text-blue-300">#{pokemon.id}</div>
        </div>

        <div className="flex flex-col sm:flex-row-reverse justify-center">
          <div>
            {/* <img src={pokemon.sprites.front_default}></img> */}
            {/* <img
              src={pokemon.sprites.front_default}
              width={300}
              className="mx-auto hidden sm:block"
            ></img>
            <img
              src={pokemon.sprites.front_default}
              width={150}
              className="mx-auto sm:hidden"
            ></img> */}
            <img
              src={`/images/sprites/${pokemon.id}.png`}
              width={300}
              className="mx-auto hidden sm:block"
            ></img>
            <img
              src={`/images/sprites/${pokemon.id}.png`}
              width={150}
              className="mx-auto sm:hidden"
            ></img>
          </div>
          <div className="text-center my-auto text-sm md:text-lg">
            <ul>
              <li>Height: {pokemon.height}</li>
              <li>Height: {pokemon.weight}</li>
              {pokemon.stats.map((stat, i) => (
                <li key={i} className={i == 1 || i == 3 ? "mt-3" : null}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
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
    </React.Fragment>
  );
};

Detail.getInitialProps = async ({ query }) => {
  const response = await axios
    .get(`http://localhost:3000/api/getPokemonById?id=${query.id}`)
    .then((response) => response.data.raw);

  return { pokemon: response };
};

export default Detail;
