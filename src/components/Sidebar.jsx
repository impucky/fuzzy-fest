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
    <div className="z-[500] flex h-3/5 w-full flex-col overflow-hidden bg-gradient-to-t from-neutral-900 to-transparent shadow-[0_0_8px_rgba(0,0,0,0.7)] lg:h-full lg:w-2/5">
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
                <Link
                  href={baseUrl}
                  className="text-md p-2 text-center text-[salmon] shadow-md hover:bg-neutral-800 hover:text-white hover:underline"
                >
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
