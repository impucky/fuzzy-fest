import { Link, Route, Switch, useLocation } from "wouter";
import FestivalList from "./FestivalList";
import Festival from "./Festival";

export default function Sidebar(props) {
  const { festivals, bands } = props;
  const [location, setLocation] = useLocation();

  return (
    <div className="z-[500] w-3/6 overflow-y-auto shadow-sm">
      <Switch>
        <Route path="/">
          <FestivalList festivals={festivals} />
        </Route>

        <Route path="/:festival">
          {(params) => {
            const info = festivals.find((f) => f.slug === params.festival);
            if (!info) {
              setLocation("/");
              return;
            }
            return (
              <>
                <Link href="/" className="p-2 text-sm hover:underline">
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
