import { NextRouter, useRouter } from "next/router";
import Image from 'next/image';
import Link from 'next/link';
import { ParsedUrlQuery } from "querystring";
import axios from "axios";
import fs from 'fs';

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
    height: number,
    weight: number,
    abilities: Ability[]
    base_experience: number,
    forms: ResourceNameURI[],
    stats: Stat[],
    moves?: [],
    species?: [],
    sprites?: {
      front_default: string
    }
  }

const Detail = ({ pokemon }: { pokemon: Pokemon }): JSX.Element => {
  const cachedImage = `/images/sprites/${pokemon.id}.png`;

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
            <li key={i}>{stat.stat.name}: {stat.base_stat}</li>))}
        </ul>
      </div>
      <div>
        <Image src={cachedImage} height={200} width={200} />
      </div>
      <Link href="/">Back</Link>
      <Link href={`/pokemon/${pokemon.id + 1}`}>Next</Link>
      <Link href={pokemon.id === 1 ? '/' : `/pokemon/${pokemon.id - 1}`}>Back</Link>
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
