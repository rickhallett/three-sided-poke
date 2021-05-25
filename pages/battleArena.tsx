import { useEffect, useState } from "react";
import { Pokemon } from "../inferfaces/pokemon.types";
import PokemonDetail from "../components/PokemonDetail";
import { LOCAL_STORAGE } from '../config/config';

const BattleArena = () => {
  const [favourites, setFavourites] = useState<Partial<Pokemon>[]>();
  const [contenderOne, setContenderOne] = useState<Partial<Pokemon>>();
  const [contenderTwo, setContenderTwo] = useState<Partial<Pokemon>>();

  useEffect(() => {
    const fetchLocalStorage = async () => {
      const browserFavouritesStore = window.localStorage.getItem(
        LOCAL_STORAGE.FAVOURITES
      );

      const storeObj = JSON.parse(browserFavouritesStore);
      if (!storeObj) {
        return;
      }

      console.log(storeObj);

      setFavourites(storeObj.favourites);
    };

    fetchLocalStorage();
  }, []);

  const handleContenderOneSelect = (event) => {
    console.log(event.target.value);
    console.log(favourites);
    setContenderOne(favourites.find((p) => p.name === event.target.value));
  };

  const handleContenderTwoSelect = (event) => {
    console.log(event.target.value);
    console.log(favourites);
    setContenderTwo(favourites.find((p) => p.name === event.target.value));
  };

  return (
    <div>
      <div className="flex justify-around mx-auto text-gray-600 m-5">
        <div className="flex my-auto">
          <label className="self-center">Contender 1</label>
          <select
            className="border-2 border-gray-300 rounded-full text-gray-400 h-10 w-60 pl-5 pr-10 ml-5 bg-white text-sm hover:border-gray-400 focus:outline-none appearance-none"
            onInput={(event) => handleContenderOneSelect(event)}
          >
            {favourites &&
              favourites.map((f, i) => (
                <option key={f.name + i}>{f.name}</option>
              ))}
          </select>
        </div>

        <div className="flex my-auto">
          <label className="self-center">Contender 2</label>
          <select
            className="border-2 border-gray-300 rounded-full text-gray-400 h-10 w-60 pl-5 pr-10 ml-5 bg-white text-sm hover:border-gray-400 focus:outline-none appearance-none"
            onInput={(event) => handleContenderTwoSelect(event)}
          >
            {favourites &&
              favourites.map((f, i) => (
                <option key={f.name + i}>{f.name}</option>
              ))}
          </select>
        </div>
      </div>
      <PokemonDetail pokemon={contenderOne} />
      <PokemonDetail pokemon={contenderTwo} />
    </div>
  );
};

export default BattleArena;
