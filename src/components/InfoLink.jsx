import { Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import InfoIcon from "../icons/info.svg?react";

export default function InfoLink() {
  const [location, setLocation] = useHashLocation();

  if (location === "/about") return;

  return (
    <Link
      to="/about"
      className="absolute bottom-5 right-1 z-[500] flex size-6 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 sm:size-8"
    >
      <InfoIcon className="size-5 cursor-pointer text-neutral-400 transition hover:text-white sm:size-6" />
    </Link>
  );
}
