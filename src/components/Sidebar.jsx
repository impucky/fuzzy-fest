import { Route, Switch, Redirect, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import FestivalList from "./FestivalList";
import Festival from "./Festival";

export default function Sidebar({
  festivals,
  bands,
  highlight,
  onFestivalHover,
}) {
  const [location, setLocation] = useHashLocation();

  return (
    <div className="z-[500] flex h-3/5 w-full flex-col overflow-hidden bg-gradient-to-t from-neutral-900 to-transparent shadow-[0_0_8px_rgba(0,0,0,0.7)] lg:h-full lg:w-2/5">
      <Switch>
        <Route path="/">
          <FestivalList
            festivals={festivals}
            highlight={highlight}
            onFestivalHover={onFestivalHover}
          />
        </Route>

        <Route path={`:festival`}>
          {(params) => {
            const info = festivals.find((f) => f.slug === params.festival);
            if (!info) {
              setLocation("/");
              return;
            }
            return (
              <Festival
                info={info}
                bands={bands.filter((b) => info.lineup.includes(b.slug))}
              />
            );
          }}
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}
