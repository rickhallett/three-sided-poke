import React, { useState, useEffect } from "react";
import axios from "axios";

const IndexCard = (props) => {
  if (!props.id) {
    return <div>?</div>;
  }

  const [pokemonCard, setPokemonCard] = useState({
    name: props.name,
    id: props.id,
    sprites: {
      front_default: null,
    },
  });

  useEffect((): any => {
    let mounted = true;
    const fetchData = async () => {
      const source = axios.CancelToken.source();
      const result = await axios.get(
        `http://localhost:3000/api/getPokemonById?id=${props.id}`,
        { cancelToken: source.token }
      );

      if (mounted) {
        setPokemonCard(result.data.raw);
      }

      return () => source.cancel();
    };

    fetchData();

    return () => (mounted = false);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
    window.location.href = `/pokemon/${id}`;
  };

  return (
    <div
      className="text-center p-1 m-2 border-solid border-4 border-gray-50 rounded-2xl shadow-lg hover:border-gray-100 hover:bg-gray-100 cursor-pointer min-h-card min-w-card"
      onClick={(event) => handleClick(event, pokemonCard.id)}
    >
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
      {/* <a
        className="text-gray-400 cursor-pointer"
        href={`/pokemon/${pokemonCard.id}`}
      >
        more...
      </a> */}
    </div>
  );
};

// IndexCard.getInitialProps = async () => {};

export default IndexCard;
