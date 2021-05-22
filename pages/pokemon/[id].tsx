import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

const Detail = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const params: ParsedUrlQuery = router.query;
  const pokemonId = params.id;

  return (
    <p>Pokemon ID: { pokemonId }</p>
  )
}

export default Detail;