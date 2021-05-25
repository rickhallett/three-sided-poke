import React from "react";

export const PokemonStats = ({ pokemon }) => {
  return (
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
  );
};
