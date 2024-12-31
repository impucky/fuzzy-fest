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
    if (!lineup) continue;
    // Get top track for every band
    for (const band of lineup) {
      const id = await getBandId(band);
      if (id) {
        const topTrack = await getTopTrack(id);
        trackUris.push(topTrack);
      }
    }
    if (playlistId) {
      console.log("Updating existing playlist for", name);
      await updatePlaylist(playlistId, trackUris);
    } else {
      console.log("Creating a new playlist for", name);
      const newPlaylistId = await createPlaylist(name, year, trackUris);
      await saveFestival({ ...data.attributes, playlistId: newPlaylistId });
    }
  }
}

async function getBandId(slug) {
  const data = fm(
    fs.readFileSync(`./public/content/bands/${slug}.md`, "utf-8"),
  );
  return data.attributes.spotifyId;
}

async function updatePlaylist(playlistId, trackUris) {
  try {
    const isOwnPlaylist = await checkOwnership(playlistId);
    if (!isOwnPlaylist) {
      console.log("Not my playlist, skipping...");
      return;
    }
    await clearPlaylist(playlistId);
    console.log("Updating playlist", playlistId);

    await addTracks(playlistId, trackUris);
    console.log("Updated " + playlistId);
  } catch (error) {
    console.error(`Failed to update playlist: ${error.message}`);
    throw error;
  }
}

async function checkOwnership(playlistId) {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: headers(clientToken),
      },
    );
    console.log("playlist owner:", response.data.owner.id);
    if (response.data.owner.id !== userId) {
      return false;
    } else return true;
  } catch (error) {
    console.error(`Couldn't check ownership: ${error.message}`);
  }
}

async function clearPlaylist(playlistId) {
  console.log("Clearing playlist", playlistId);
  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: [],
      },
      {
        headers: headers(userToken),
      },
    );
    console.log(`Cleared`);
  } catch (error) {
    console.error(`Failed to clear playlist: ${error.message}`);
  }
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
