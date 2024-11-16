import { Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import InfoIcon from "../icons/info.svg?react";

export default function InfoLink() {
  const [location, setLocation] = useHashLocation();

  if (location === "/about") return;

  return (
    <Link
      to="/about"
      className="absolute bottom-6 right-2 z-[500] flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700"
    >
      <InfoIcon className="h-6 w-6 cursor-pointer text-neutral-400 transition hover:text-white" />
    </Link>
  );
}
