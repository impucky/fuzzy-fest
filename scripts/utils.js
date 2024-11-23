import fs from "fs";
import qs from "qs";
import fm from "front-matter";
import path from "path";
import yaml from "js-yaml";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export async function getJsonAuth() {
  try {
    const tokenData = JSON.parse(fs.readFileSync("tokens.json", "utf-8"));
    return tokenData.access_token;
  } catch (error) {
    console.error("Couldn't retrieve auth token", error);
    return null;
  }
}

export async function getClientAuth() {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: process.env.SPOTIFY_ID,
      password: process.env.SPOTIFY_SECRET,
    },
  };

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({ grant_type: "client_credentials" }),
      options,
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    throw error;
  }
}

export function saveBand(bandObj) {
  const toYaml = yaml.dump(bandObj, { indent: 2 });
  const toMarkdown = `---\n${toYaml}---\n`;

  fs.writeFile(
    path.join(process.cwd(), `/public/content/bands/${bandObj.slug}.md`),
    toMarkdown,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Saved ${bandObj.slug}.md`);
    },
  );
}

export function saveFestival(festivalObj) {
  const toYaml = yaml.dump(festivalObj, { indent: 2 });
  const toMarkdown = `---\n${toYaml}---\n`;

  fs.writeFile(
    path.join(
      process.cwd(),
      `/public/content/festivals/${festivalObj.slug}.md`,
    ),
    toMarkdown,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Saved ${festivalObj.slug}.md`);
    },
  );
}
