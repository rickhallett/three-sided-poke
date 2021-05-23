import { NextRouter, useRouter } from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

export const createSpriteURI = (id: number) => {
  return ``
}

type ResourceNameURI = {
    name: string,
    url: string
  }

  type Stat = {
    base_stat: number,
    effort: number,
    stat: ResourceNameURI
  }

  type Ability = {
    ability: ResourceNameURI,
    is_hidden: boolean,
    slot: number
  }

type Pokemon = {
    name: string,
    id: number,
    abilities: Ability[]
    base_experience: number,
    stats: Stat[],
    moves?: [],
    species?: [],
  }

const Detail = ({ pokemon }): JSX.Element => {
  return (
    <div>
      <h1>
        {pokemon.name}
        <span>#{pokemon.id}</span>
      </h1>
      <div>
        <h2>Forms</h2>
        <ul>
          {pokemon.forms.map((form, i) => (
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
            <li key={i}>{stat.stat.name}: {stat.base_stat}</li>))}
        </ul>
      </div>
      <div>
        <Image src={pokemon.sprites.front_default} height={200} width={200} />
      </div>
      <Link href="/">Back</Link>
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

{
  /* <a href={`http://localhost:3000/api/getPokemonById?id=${form.id}`}></a> */
}

// "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
