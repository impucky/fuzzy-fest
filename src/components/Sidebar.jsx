import { Route, Switch, Redirect, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useAtomValue } from "jotai";
import FestivalList from "./FestivalList";
import Festival from "./Festival";
import About from "./About";

export default function Sidebar() {
  const [location, setLocation] = useHashLocation();

  return (
    <div className="z-[500] flex h-2/5 w-full flex-col bg-gradient-to-t from-neutral-950 to-neutral-800 shadow-[0_0_8px_rgba(0,0,0,0.7)] sm:order-last sm:h-full sm:w-2/5">
      <Switch>
        <Route path="/">
          <FestivalList />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path={`:festival`}>
          <Festival />
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}
