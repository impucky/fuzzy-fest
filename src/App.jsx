import { useState, useEffect } from "react";
import { client } from "../tina/__generated__/client";
import { useAtom } from "jotai";
import { festivalsAtom } from "./atoms/festivalsAtom";
import { bandsAtom } from "./atoms/bandsAtom";
import { motion } from "motion/react";
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="flex h-dvh w-full flex-col bg-gradient-to-t from-neutral-950 to-neutral-800 sm:flex-row"
    >
      <Sidebar />
      <Map />
    </motion.main>
  ) : (
    <div className="flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
}
