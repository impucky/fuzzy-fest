import { useState, useEffect } from "react";
import { client } from "../tina/__generated__/client";
import { useAtom } from "jotai";
import { festivalsAtom } from "./atoms/festivalsAtom";
import { bandsAtom } from "./atoms/bandsAtom";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Spinner from "./components/Spinner/Spinner";

export default function App() {
  const [festivals, setFestivals] = useAtom(festivalsAtom);
  const [bands, setBands] = useAtom(bandsAtom);

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
    <main className="flex h-dvh w-full flex-col lg:flex-row">
      <Sidebar />
      <div className="relative h-2/5 w-full flex-grow lg:h-full lg:w-3/5">
        <Map />
      </div>
    </main>
  ) : (
    <div className="flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
}
