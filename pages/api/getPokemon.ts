import { NextApiRequest, NextApiResponse } from "next";
import poker from "./cacher";

import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
    
  })
);

let apiLimit = 200;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  if (req.method === "POST" && typeof req.query.limit === "string") {
    apiLimit = parseInt(req.query.limit);
    res.status(200).json({ limitChange: apiLimit });
  }

  const allPokemon = await poker.resource(
    `/api/v2/pokemon?limit=200${apiLimit}`
  );
  res.status(200).json({ raw: allPokemon });
};
