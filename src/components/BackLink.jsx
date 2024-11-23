import { Link } from "wouter";
import CloseIcon from "../icons/close.svg?react";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="absolute right-0 top-0 p-2 text-neutral-400 transition hover:text-white lg:p-4"
    >
      <CloseIcon className="w-6 md:w-8" />
    </Link>
  );
}
