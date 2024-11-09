import { useState, useEffect } from "react";
import { loadJson } from "./utils";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [festivals, setFestivals] = useState(null);
  const [bands, setBands] = useState(null);

  useEffect(() => {
    async function loadFestivals() {
      const glob = import.meta.glob("./content/festivals/*.json");
      const data = await loadJson(glob);
      setFestivals(data);
    }

    async function loadBands() {
      const glob = import.meta.glob("./content/bands/*.json");
      const data = await loadJson(glob);
      setBands(data);
    }

    loadFestivals();
    loadBands();
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
