import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Pokemon } from "../inferfaces/pokemon.types";
import IndexCardHeader from "../components/IndexCardHeader";
import { printLocalStorage } from "../util/debug";
import { LOCAL_URI, LOCAL_STORAGE, REMOTE_URI } from "../config/config";
import { IndexCardSprite } from "./IndexCardSprite";
import { IndexCardSave } from "./IndexCardSave";
import AlertModal from "./AlertModal";

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

  const [pokemonCard, setPokemonCard] = useState<Partial<Pokemon>>({
    name: props.name,
    id: props.id,
    sprites: {
      front_default: null,
    },
    favourite: false,
  });

  const [showModal, setShowModel] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = (event) => {
    event ? event.stopPropagation() : null;
    setModalMessage("");
    setShowModel(false);
  };

  let testMap = {};

  resetMap(testMap);

  const [isFavourite, setIsFavourite] = useState(testMap);

  useEffect((): any => {
    let mounted = {
      data: true,
    };

    const fetchData = async () => {
      const source = axios.CancelToken.source();
      const result = await axios.get(
        // `http://localhost:3000/api/getPokemonById?id=${props.id}`,
        `${REMOTE_URI.GET_POKEMON}/${props.id}`,
        { cancelToken: source.token }
      );

      if (mounted.data) {
        // remote/local data source format conditional
        if (result.data.results) {
          setPokemonCard(result.data.results);
        } else {
          setPokemonCard(result.data);
        }
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

    const browserFavouritesStore = window.localStorage.getItem(
      LOCAL_STORAGE.FAVOURITES
    );

    if (!browserFavouritesStore) {
      window.localStorage.setItem(
        LOCAL_STORAGE.FAVOURITES,
        JSON.stringify({ favourites: [pokemonCard] })
      );

      setModalMessage(`${pokemonCard.name} saved!`);
      setShowModel(true);

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
      setModalMessage(`${pokemonCard.name} removed!`);
      setShowModel(true);

      return;
    }

    parsedFavouriteStore.favourites.push(pokemonCard);

    window.localStorage.setItem(
      LOCAL_STORAGE.FAVOURITES,
      JSON.stringify({ favourites: parsedFavouriteStore.favourites })
    );

    printLocalStorage("updated store - added");
    setModalMessage(`${pokemonCard.name} saved!`);
    setShowModel(true);

    fetchLocalStorage();
  };

  if (pokemonCard) {
    return (
      <div
        className="bg-white text-center p-1 m-2 border-solid border-4 border-gray-50 rounded-2xl shadow-lg hover:border-gray-100 transform hover:scale-105 cursor-pointer min-h-card min-w-card opacity=100"
        onClick={(event) => handleCardClick(event, pokemonCard.id)}
      >
        <IndexCardHeader pokemon={pokemonCard} />
        <IndexCardSprite pokemon={pokemonCard} />
        <IndexCardSave
          pokemon={pokemonCard}
          isFavourite={isFavourite}
          handlePokemonSave={handlePokemonSave}
        />
        {showModal && (
          <AlertModal message={modalMessage} closeModal={handleCloseModal} />
        )}
      </div>
    );
  }

  if (!pokemonCard) {
    return (
      <div
        className="bg-white text-center p-1 m-2 border-solid border-4 border-gray-50 rounded-2xl shadow-lg hover:border-gray-100 transform hover:scale-105 cursor-pointer min-h-card min-w-card opacity=100"
        onClick={(event) => handleCardClick(event, pokemonCard.id)}
      ></div>
    );
  }
};

export default IndexCard;
