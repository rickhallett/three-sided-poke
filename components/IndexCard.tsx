import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import poker from '../pages/api/cacher';

const IndexCard = (props) => {
  const [pokemonCard, setPokemonCard] = useState({ 
    name: props.name, 
    id: props.id, 
    sprites: { 
      front_default: null 
    } 
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/api/getPokemonById?id=${props.id}`);
      await setPokemonCard(result.data.raw);
    }

    fetchData();
  }, []);

  return (
    <div className="w-3/12 text-center p-1 m-1 border-solid border-4 border-gray-50 rounded-2xl shadow-lg hover:scale-115 hover:bg-gray-100">
      <div className="flex justify-between p-3">
        <div className="text-gray-600 tracking-wider">{pokemonCard.name}</div>
        <div className="text-3xl font-bold text-blue-300">
          #{pokemonCard.id}
        </div>
      </div>
      {/* <img src={pokemonCard.sprites.front_default}></img> */}
      <img
        src={`/images/sprites/${pokemonCard.id}.png`}
        width={150}
        className="mx-auto"
      ></img>
      <a className="text-gray-400 cursor-pointer" href={`/pokemon/${pokemonCard.id}`}>
        more...
      </a>
    </div>
  );
};

// IndexCard.getInitialProps = async () => {};

export default IndexCard;
