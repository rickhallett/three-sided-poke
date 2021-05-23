import axios from "axios";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { tryGetPreviewData } from 'next/dist/next-server/server/api-utils';
import poker from "./cacher";

const download_image = (url: string, image_path: string) =>
  axios({
    url,
    responseType: "stream",
  }).then(
    (response) =>
      new Promise((resolve, reject): void => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", (data) => resolve(data))
          .on("error", (e) => reject(e));
      })
  );

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pokemon = await poker.resource("/api/v2/pokemon/" + req.query.id);

  try {
    fs.readFileSync(`public/images/sprites/${pokemon.id}.png`);
  } catch (error) {
    console.info(`Sprite ${pokemon.id} not downloaded. Fetching...`);
    await download_image(
      pokemon.sprites.front_default,
      `public/images/sprites/${pokemon.id}.png`
    );
  }
  
  res.status(200).json({ raw: pokemon });
};
