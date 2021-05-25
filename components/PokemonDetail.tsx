import React, { Component } from "react";
import Link from "next/link";

const PokemonDetail = ({ pokemon }) => {
  if (!pokemon) {
    return null;
  }

  return (
    <div className="bg-white w-1/2 mx-auto sm:w-full flex-col text-center p-1 m-1 mt-5 border-solid border-4 border-gray-50 rounded-2xl shadow-lg">
      <div className="flex w-full justify-between p-3">
        <div className="text-base sm:text-3xl text-gray-600 tracking-wider">
          {pokemon.name}
        </div>
        <div className="text-3xl font-bold text-blue-300">#{pokemon.id}</div>
      </div>

      <div className="flex flex-col sm:flex-row-reverse justify-center">
        <div>
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
            {pokemon.stats &&
              pokemon.stats.map((stat, i) => (
                <li key={i} className={i == 1 || i == 3 ? "mt-3" : null}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
