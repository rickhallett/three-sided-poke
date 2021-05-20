import Head from "next/head";
import axios from "axios";

const Index = ({ pokemon }) => {
  return (
    <div>
      Hello, Pokedex!
      {pokemon.map((pokemon, i) => {
        return (
          <div>
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
