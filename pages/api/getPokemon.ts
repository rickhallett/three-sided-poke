import { NextApiRequest, NextApiResponse } from "next";
import poker from "./cacher";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const allPokemon = await poker.resource("/api/v2/pokemon?limit=200");
  res.status(200).json({ raw: allPokemon });
};
