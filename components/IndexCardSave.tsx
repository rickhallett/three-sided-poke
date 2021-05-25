import React from "react";
import { LoadingSaveButton } from "./LoadingSaveButton";
import { StarSaveButton } from "./StarSaveButton";

export const IndexCardSave = ({ pokemon, isFavourite, handlePokemonSave }) => {
  return (
    <React.Fragment>
      {pokemon && pokemon.stats ? (
        <StarSaveButton
          pokemon={pokemon}
          isFavourite={isFavourite}
          handlePokemonSave={handlePokemonSave}
        />
      ) : (
        <LoadingSaveButton />
      )}
    </React.Fragment>
  );
};
