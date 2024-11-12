import { Link, Route, Switch, useLocation } from "wouter";
import FestivalList from "./FestivalList";
import Festival from "./Festival";
import { baseUrl } from "../utils";

export default function Sidebar({
  festivals,
  bands,
  highlight,
  onFestivalHover,
}) {
  const [location, setLocation] = useLocation();

  return (
    <div className="z-[500] w-3/6 overflow-y-auto shadow-sm">
      <Switch>
        <Route path={`${baseUrl}`}>
          <FestivalList
            festivals={festivals}
            highlight={highlight}
            onFestivalHover={onFestivalHover}
          />
        </Route>

        <Route path={`${baseUrl}:festival`}>
          {(params) => {
            const info = festivals.find((f) => f.slug === params.festival);
            if (!info) {
              setLocation(baseUrl);
              return;
            }
            return (
              <>
                <Link href={baseUrl} className="p-2 text-sm hover:underline">
                  ← Back to list
                </Link>
                <Festival
                  info={info}
                  bands={bands.filter((b) => info.lineup.includes(b.slug))}
                />
              </>
            );
          }}
        </Route>

        <Route>404: No such festival!</Route>
      </Switch>
    </div>
  );
}
