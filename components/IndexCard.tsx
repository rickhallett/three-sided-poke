import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Pokemon } from "../inferfaces/pokemon.types";
import IndexCardHeader from "../components/IndexCardHeader";
import { printLocalStorage } from "../util/debug";
import { LOCAL_URI, } from '../config/config';

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
        `http://localhost:3000/api/getPokemonById?id=${props.id}`,
        { cancelToken: source.token }
      );

      if (mounted.data) {
        setPokemonCard(result.data.raw);
      }

      return () => source.cancel();
    };

    fetchLocalStorage = async () => {
      const browserFavouritesStore = window.localStorage.getItem(
        "three-sided-pokedex:favourites"
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
      "three-sided-pokedex:favourites"
    );

    if (!browserFavouritesStore) {
      window.localStorage.setItem(
        "three-sided-pokedex:favourites",
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
        "three-sided-pokedex:favourites",
        JSON.stringify({ favourites: parsedFavouriteStore.favourites })
      );

      printLocalStorage("updated store - substracted");

      forceUpdate();
      return;
    }

    console.log("pokemonCard", pokemonCard);

    parsedFavouriteStore.favourites.push(pokemonCard);

    window.localStorage.setItem(
      "three-sided-pokedex:favourites",
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
      <img
        src={`/images/sprites/${pokemon ? pokemon.id : null}.png`}
        width={150}
        className="mx-auto"
      ></img>
      {pokemon && pokemon.stats ? (
        <svg
          className="h-6 w-6 m-2"
          fill={isFavourite[pokemon ? pokemon.id : null] ? "yellow" : "white"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ zIndex: 1000 }}
          onClick={(event) => handlePokemonSave(event, pokemon)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      )}
    </div>
  );
};

export default IndexCard;
