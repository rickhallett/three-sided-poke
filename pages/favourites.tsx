import React, { useEffect, useState } from "react";
import IndexCard from "../components/IndexCard";
import { LOCAL_STORAGE } from "../config/config";
import { Pokemon } from "../inferfaces/pokemon.types";

const Favourites = (): JSX.Element => {
  const [allPokemonData, setAllData] = useState<Partial<Pokemon>[]>();
  const [filteredPokemonData, setFilteredData] =
    useState<Partial<Pokemon>[]>(allPokemonData);

  useEffect(() => {
    const fetchLocalStorage = async () => {
      const browserFavouritesStore = window.localStorage.getItem(
        LOCAL_STORAGE.FAVOURITES
      );

      const storeObj = JSON.parse(browserFavouritesStore);
      if (!storeObj) {
        return;
      }

      setAllData(storeObj.favourites);
      setFilteredData(storeObj.favourites);
    };

    fetchLocalStorage();
  }, []);

  const onSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = event.target.value.toLowerCase();

    setFilteredData(
      allPokemonData
        .filter((item: Pokemon) => item.name.search(searchVal) !== -1)
        .sort((a: Pokemon, b: Pokemon) => (a.id > a.id ? 1 : -1))
    );
  };

  return (
    <div>
      <div className="flex justify-center mx-auto text-gray-600 m-5">
        <input
          className="border-2 border-gray-300 hover:border-gray-400 bg-white h-10 px-5 pr-16 mr-1 rounded-full text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search by name..."
          onChange={(event) => onSearchInput(event)}
        ></input>
        <div className="relative inline-flex">
          <svg
            className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fillRule="nonzero"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap justify-around mt-5">
        {filteredPokemonData && filteredPokemonData.length > 0
          ? filteredPokemonData.map((pokemon, i: number) => {
              return i < 100 ? (
                <IndexCard
                  key={i + pokemon.name}
                  name={pokemon.name}
                  id={pokemon.id}
                />
              ) : null;
            })
          : null}
      </div>
    </div>
  );
};

export default Favourites;
