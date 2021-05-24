import { NextApiRequest, NextApiResponse } from "next";
import poker from "./cacher";

let apiLimit = 200;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST" && typeof req.query.limit === "string") {
    apiLimit = parseInt(req.query.limit);
    res.status(200).json({ limitChange: apiLimit });
  }

  const allPokemon = await poker.resource(
    `/api/v2/pokemon?limit=200${apiLimit}`
  );
  res.status(200).json({ raw: allPokemon });
};
