import fm from "front-matter";
import fs from "fs";
import path from "path";
import cmpstr from "cmpstr";
import axios from "axios";
import { getClientAuth, saveBand } from "./utils.js";

const token = await getClientAuth();

async function updateBandIds() {
  const bandFiles = fs.readdirSync("./public/content/bands");

  for (const file of bandFiles) {
    const filePath = path.join("./public/content/bands", file);
    const data = fm(fs.readFileSync(filePath, "utf-8"));
    if (!data.attributes.spotifyId) {
      const id = await getSpotifyId(data.attributes.name.toLowerCase());
      if (!id) continue;
      data.attributes.spotifyId = id;
      saveBand(data.attributes);
    }
  }
}

async function getSpotifyId(bandName) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    params: {
      q: bandName,
      type: "artist",
      limit: 10,
      market: "US",
    },
  };

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search/`,
      options,
    );

    const results = response.data.artists.items.map((data) => {
      return { ...data, name: data.name.toLowerCase() };
    });

    const resultNames = results.map((r) => r.name.toLowerCase());

    const closest = cmpstr.diceClosest(bandName, resultNames);

    const match = results.filter((r) => r.name === closest)[0];
    const distance = cmpstr.diceCoefficient(bandName, match.name);
    if (distance < 0.9) {
      console.log(
        `Couldn't find a good match for ${bandName}. Best match: ${match.name}`,
      );
      return;
    }

    if (distance < 1) {
      console.log(`Weak match for ${bandName}: ${match.name} (${distance})`);
    }

    if (new Set(resultNames).size !== resultNames.length) {
      console.log(`Multiple matches for ${bandName}`);
    }

    return match.id;
  } catch (error) {
    console.error("Error getting band", error);
    throw error;
  }
}

updateBandIds();
