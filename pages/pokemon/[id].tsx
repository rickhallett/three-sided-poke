import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';

const Detail = ({ pokemon }): JSX.Element => {
  const router: NextRouter = useRouter();
  const params: ParsedUrlQuery = router.query;
  const pokemonId = params.id;

  console.log(pokemon)

  return (
    <p>Pokemon ID: { pokemonId }</p>
  )
}

Detail.getInitialProps = async ({ query }) => {
  const response = await axios
    .get(`http://localhost:3000/api/getPokemonById?id=${query.id}`)
    .then(response => response.data.raw);

  return { pokemon: response };
}

export default Detail;