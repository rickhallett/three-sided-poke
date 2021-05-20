import Head from "next/head";
import axios from "axios";

type Pokemon = {
  name: string;
};

const Index = ({ pokemon }) => {
  return (
    <div>
      Hello, Pokedex!
      {pokemon.map((pokemon: Pokemon, i: number) => {
        return (
          <div key={i}>
            {i + 1}:{pokemon.name}
          </div>
        );
      })}
    </div>
  );
};

Index.getInitialProps = async () => {
  const pokemon = await axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then((response) => response.data.results);

  return { pokemon };
};

export default Index;
