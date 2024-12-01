import { Link } from "wouter";
import CloseIcon from "../icons/close.svg?react";

export default function BackLink() {
  return (
    <Link
      href="/festivals"
      className="absolute right-0 top-0 z-[1] p-2 pr-3 text-neutral-400 transition hover:text-white lg:p-4 lg:pr-5"
    >
      <CloseIcon className="w-8" />
    </Link>
  );
}
