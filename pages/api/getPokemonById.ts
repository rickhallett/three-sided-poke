import { NextApiRequest, NextApiResponse } from "next";
import poker from "./cacher";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pokemon = await poker.resource("/api/v2/pokemon/" + req.query.id);
  res.status(200).json({ raw: pokemon });
};
