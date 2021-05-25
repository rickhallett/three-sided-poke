import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Pokemon } from "../inferfaces/pokemon.types";
import IndexCardHeader from "../components/IndexCardHeader";
import { printLocalStorage } from "../util/debug";
import { LOCAL_URI, LOCAL_STORAGE } from "../config/config";
import { IndexCardSprite } from "./IndexCardSprite";
import { IndexCardSave } from "./IndexCardSave";

let fetchLocalStorage;

const resetMap = (map) => {
  let testMap = {} || map;
  for (let index = 0; index < 1000; index++) {
    testMap[index] = false;
  }
  return testMap;
};

const IndexCard = (props) => {
  if (!props.id) {
    return <div>No poke!</div>;
  }

  const [pokemon, setPokemonCard] = useState<Partial<Pokemon>>({
    name: props.name,
    id: props.id,
    sprites: {
      front_default: null,
    },
    favourite: false,
  });

  let testMap = {};

  resetMap(testMap);

  const [isFavourite, setIsFavourite] = useState(testMap);

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect((): any => {
    let mounted = {
      data: true,
    };

    const fetchData = async () => {
      const source = axios.CancelToken.source();
      const result = await axios.get(
        `https://three-sided-poke.vercel.app/api/getPokemonById?id=${props.id}`,
        { cancelToken: source.token }
      );

      if (mounted.data) {
        setPokemonCard(result.data.raw);
      }

      return () => source.cancel();
    };

    fetchLocalStorage = async () => {
      const browserFavouritesStore = window.localStorage.getItem(
        LOCAL_STORAGE.FAVOURITES
      );

      const storeObj = JSON.parse(browserFavouritesStore);
      if (!storeObj) {
        return;
      }

      resetMap(testMap);

      storeObj.favourites.map((f: Partial<Pokemon>, i) => {
        isFavourite[f.id] = true;
      });

      // TODO: why can we not re-render by updating state that the component depends on?
      // setIsFavourite({ ...isFavourite });
      // setPokemonCard(pokemonCard);
    };

    fetchData();
    fetchLocalStorage();

    return () => (mounted.data = false);
  }, []);

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    window.location.href = `/pokemon/${id}`;
  };

  const handlePokemonSave = (event: any, pokemonCard) => {
    event.stopPropagation();
    forceUpdate();

    const browserFavouritesStore = window.localStorage.getItem(
      LOCAL_STORAGE.FAVOURITES
    );

    if (!browserFavouritesStore) {
      window.localStorage.setItem(
        LOCAL_STORAGE.FAVOURITES,
        JSON.stringify({ favourites: [pokemonCard] })
      );

      printLocalStorage("init store:");

      return;
    }

    const parsedFavouriteStore = JSON.parse(browserFavouritesStore);

    const alreadySaved = JSON.parse(browserFavouritesStore).favourites.find(
      (element) => element.name == pokemonCard.name
    );

    if (alreadySaved) {
      parsedFavouriteStore.favourites = parsedFavouriteStore.favourites.filter(
        (f) => {
          return f.name !== alreadySaved.name;
        }
      );

      window.localStorage.setItem(
        LOCAL_STORAGE.FAVOURITES,
        JSON.stringify({ favourites: parsedFavouriteStore.favourites })
      );

      printLocalStorage("updated store - substracted");

      forceUpdate();
      return;
    }

    console.log("pokemonCard", pokemonCard);

    parsedFavouriteStore.favourites.push(pokemonCard);

    window.localStorage.setItem(
      LOCAL_STORAGE.FAVOURITES,
      JSON.stringify({ favourites: parsedFavouriteStore.favourites })
    );

    printLocalStorage("updated store - added");

    fetchLocalStorage();
  };

  return (
    <div
      className="bg-white text-center p-1 m-2 border-solid border-4 border-gray-50 rounded-2xl shadow-lg hover:border-gray-100 transform hover:scale-105 cursor-pointer min-h-card min-w-card opacity=100"
      onClick={(event) => handleCardClick(event, pokemon.id)}
    >
      <IndexCardHeader pokemon={pokemon} />
      <IndexCardSprite pokemon={pokemon} />
      <IndexCardSave
        pokemon={pokemon}
        isFavourite={isFavourite}
        handlePokemonSave={handlePokemonSave}
      />
    </div>
  );
};

export default IndexCard;
