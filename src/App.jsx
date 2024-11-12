import { useState, useEffect } from "react";
import { loadJson } from "./utils";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

import { client } from "../tina/__generated__/client";

export default function App() {
  const [festivals, setFestivals] = useState(null);
  const [bands, setBands] = useState(null);
  const [highlight, setHighlight] = useState(null);

  function onFestivalHover(slug) {
    setHighlight(slug);
  }

  useEffect(() => {
    async function loadContent() {
      const festivalsResponse = await client.queries.festivalConnection();
      const festivals = festivalsResponse.data.festivalConnection.edges.map(
        (festival) => {
          return festival.node;
        },
      );
      // TODO move band loading to festival page
      const bandsResponse = await client.queries.bandConnection({ last: 999 });
      const bands = bandsResponse.data.bandConnection.edges.map((band) => {
        return band.node;
      });
      setFestivals(festivals);
      setBands(bands);
    }

    loadContent();
  }, []);

  return festivals && bands ? (
    <main className="flex h-screen flex-row">
      <Sidebar
        festivals={festivals}
        bands={bands}
        highlight={highlight}
        onFestivalHover={onFestivalHover}
      />
      <Map
        festivals={festivals}
        highlight={highlight}
        onFestivalHover={onFestivalHover}
      />
    </main>
  ) : (
    <div className="flex h-full items-center justify-center">
      <span>Loading...</span>
    </div>
  );
}
