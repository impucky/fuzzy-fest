import { useHashLocation } from "wouter/use-hash-location";

export default function Header() {
  const [location, _] = useHashLocation();
  if (location === "/") return;
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-[500] flex h-fit w-min flex-col items-start p-1 text-center drop-shadow-[2px_2px_2px_#232634] lg:p-2">
      <h1 className="font-logo sm:leading-auto text-2xl font-bold !leading-none text-[#fc9084] drop-shadow-[0px_5px_0_#bf4e4e] sm:text-nowrap md:text-3xl lg:text-4xl">
        FUZZY FEST
      </h1>
      <h2 className="font-vk text-md mt-1 hidden w-full font-bold !leading-tight sm:block lg:text-lg">
        Heavy music festivals across Europe
      </h2>
    </div>
  );
}
