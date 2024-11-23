import http from "http";
import axios from "axios";
import qs from "qs";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.SPOTIFY_ID;
const clientSecret = process.env.SPOTIFY_SECRET;
const redirectUri = "http://localhost:3000/callback";

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/login")) {
    const scopes = "playlist-modify-public playlist-modify-private";
    const authUrl = `https://accounts.spotify.com/authorize?${qs.stringify({
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: scopes,
    })}`;

    res.writeHead(302, { Location: authUrl });
    res.end();
  } else if (req.url.startsWith("/callback")) {
    const code = new URL(req.url, `http://localhost:3000`).searchParams.get(
      "code",
    );

    try {
      const tokenResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        },
      );

      const { access_token, refresh_token } = tokenResponse.data;
      fs.writeFileSync(
        "tokens.json",
        JSON.stringify({ access_token, refresh_token }),
        "utf-8",
      );

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Authorization successful, tokens saved.");
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error during authentication.");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Login on http://localhost:3000/login");
});

process.on("SIGINT", () => {
  console.log("Server shutting down, deleting tokens.json...");
  fs.unlink("tokens.json", (err) => {
    if (err) {
      console.error("Error deleting tokens.json:", err);
    } else {
      console.log("tokens.json deleted successfully");
    }
    process.exit();
  });
});
