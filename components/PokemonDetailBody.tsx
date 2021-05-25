import { PokemonStats } from "./PokemonStats";

export const PokemonDetailBody = ({ pokemon }) => {
  return (
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
      <PokemonStats pokemon={pokemon} />
    </div>
  );
};
