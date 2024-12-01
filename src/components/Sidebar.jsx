import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { AnimatePresence, motion } from "motion/react";
import FestivalList from "./FestivalList";
import Festival from "./Festival";
import About from "./About";
import Landing from "./Landing";
import BackLink from "./BackLink";

export default function Sidebar() {
  const [location, setLocation] = useHashLocation();
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const returningUser = localStorage.getItem("returningUser");
    if (returningUser) {
      setShowLanding(false);
    } else if (location !== "/") {
      localStorage.setItem("returningUser", "true");
    }
  }, [location]);

  return (
    <AnimatePresence>
      <Switch>
        <Route path="/">
          <SidebarLayout key={location}>
            {showLanding ? <Landing /> : <FestivalList />}
          </SidebarLayout>
        </Route>

        <Route path="/festivals">
          <SidebarLayout key={location}>
            <FestivalList />
          </SidebarLayout>
        </Route>

        <Route path="/about">
          <SidebarLayout key={location}>
            <BackLink />
            <About />
          </SidebarLayout>
        </Route>

        <Route path={`/festival/:festival`}>
          <SidebarLayout key={location}>
            <BackLink />
            <Festival />
          </SidebarLayout>
        </Route>

        <Route>
          <Redirect to="/festivals" />
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function SidebarLayout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-[500] flex h-2/5 w-full flex-col shadow-[0_0_8px_rgba(0,0,0,0.7)] lg:h-full lg:w-2/5"
    >
      {children}
    </motion.div>
  );
}
