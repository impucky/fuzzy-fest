import { useState, useEffect } from "react";
import { loadJson } from "./utils";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

import { client } from "../tina/__generated__/client";

export default function App() {
  const [festivals, setFestivals] = useState(null);
  const [bands, setBands] = useState(null);

  useEffect(() => {
    async function loadContent() {
      const festivalsResponse = await client.queries.festivalConnection();
      const festivals = festivalsResponse.data.festivalConnection.edges.map(
        (festival) => {
          return festival.node;
        },
      );
      const bandsResponse = await client.queries.bandConnection();
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
      <Sidebar festivals={festivals} bands={bands} />
      <Map festivals={festivals} />
    </main>
  ) : (
    <div className="flex h-full items-center justify-center">
      <span>Loading...</span>
    </div>
  );
}
