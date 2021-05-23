import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Pokemon, ResourceNameURI } from '../../types/pokemon.types';

const Detail = ({ pokemon }: { pokemon: Pokemon }): JSX.Element => {
  if (!pokemon) {
    return <div>No poke!</div>;
  }

  return (
    <div>
      <h1>
        <span>#{pokemon.id}</span>
      </h1>
      <div>
        <h2>Forms</h2>
        <ul>
          {pokemon.forms.map((form: ResourceNameURI, i) => (
            <li key={i}>{form.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Stats</h2>
        <ul>
          <li>Height: {pokemon.height}</li>
          <li>Height: {pokemon.weight}</li>
          {pokemon.stats.map((stat, i) => (
            <li key={i}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Image
          src={`/images/sprites/${pokemon.id}.png`}
          height={200}
          width={200}
        />
      </div>
      <Link href="/">Back</Link>
      <Link href={`/pokemon/${pokemon.id + 1}`}>Next</Link>
      <Link href={pokemon.id === 1 ? "/" : `/pokemon/${pokemon.id - 1}`}>
        Home
      </Link>
    </div>
  );
};

Detail.getInitialProps = async ({ query }) => {
  const response = await axios
    .get(`http://localhost:3000/api/getPokemonById?id=${query.id}`)
    .then((response) => response.data.raw);

  return { pokemon: response };
};

export default Detail;
