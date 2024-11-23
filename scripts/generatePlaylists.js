import fm from "front-matter";
import fs from "fs";
import path from "path";
import axios from "axios";
import { getClientAuth, getJsonAuth, saveFestival } from "./utils.js";

const clientToken = await getClientAuth();
const userToken = await getJsonAuth();
const userId = "316atvyskz544cengx4zfqbbi3ru";

const headers = (token) => {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

async function createAll() {
  const festivalFiles = fs.readdirSync("./public/content/festivals");

  for (const file of festivalFiles) {
    const trackUris = [];
    const filePath = path.join("./public/content/festivals", file);
    const data = fm(fs.readFileSync(filePath, "utf-8"));
    const { lineup, name, year, playlistId } = data.attributes;
    if (playlistId) continue;
    if (!lineup) continue;
    // Get top track for every band
    for (const band of lineup) {
      const id = await getBandId(band);
      if (id) {
        const topTrack = await getTopTrack(id);
        trackUris.push(topTrack);
      }
    }
    const newPlaylistId = await createPlaylist(name, year, trackUris);
    await saveFestival({ ...data.attributes, playlistId: newPlaylistId });
  }
}

async function getBandId(slug) {
  const data = fm(
    fs.readFileSync(`./public/content/bands/${slug}.md`, "utf-8"),
  );
  return data.attributes.spotifyId;
}

async function createPlaylist(festivalName, festivalYear, trackUris) {
  const title = `${festivalName} ${festivalYear}`;
  const playlistResponse = await axios.post(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      name: title,
      public: true,
    },
    {
      headers: headers(userToken),
    },
  );
  await addTracks(playlistResponse.data.id, trackUris);
  console.log("Created " + title);
  return playlistResponse.data.id;
}

async function addTracks(playlistId, trackUris) {
  await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      uris: trackUris,
    },
    {
      headers: headers(userToken),
    },
  );
}

async function getTopTrack(bandId) {
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${bandId}/top-tracks`,
    {
      headers: headers(clientToken),
    },
  );
  return response.data.tracks[0].uri;
}

createAll();
