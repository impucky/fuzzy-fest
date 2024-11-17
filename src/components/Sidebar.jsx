import { Route, Switch, Redirect, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useAtomValue } from "jotai";
import FestivalList from "./FestivalList";
import Festival from "./Festival";
import About from "./About";

export default function Sidebar() {
  const [location, setLocation] = useHashLocation();
  const onFest = location !== "/" && location !== "/about";

  const sidebarStyles = `${onFest ? "lg:!w-1/2" : ""} transition-width transition-duration-100 min-w-min
  lg:order-last z-[500] flex h-1/2 flex-col bg-gradient-to-t from-neutral-950 to-neutral-800 shadow-[0_0_8px_rgba(0,0,0,0.7)] lg:h-full lg:w-1/3`;

  return (
    <div className={sidebarStyles}>
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
