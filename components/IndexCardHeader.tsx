import React from "react";

const IndexCardHeader = ({ pokemon }) => {
  return (
    <div className="flex justify-between p-3">
      <div className="text-gray-600 tracking-wider" data-testid="pokemon-name">
        {pokemon ? pokemon.name : null}
      </div>
      <div className="text-3xl font-bold text-blue-300">
        #{pokemon ? pokemon.id : null}
      </div>
    </div>
  );
};

export default IndexCardHeader;
