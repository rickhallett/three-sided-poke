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
  const response = await axios
    .get("http://localhost:3000/api/getPokemon")
    .then((response) => response.data.raw);

  return { pokemon: response.results };
};

export default Index;
