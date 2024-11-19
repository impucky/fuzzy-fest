import { Link } from "wouter";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="text-md sticky top-0 z-[500] bg-neutral-800 p-0 text-center text-[salmon] shadow-md transition hover:bg-neutral-700 hover:text-white hover:underline sm:p-2"
    >
      ← Back to list
    </Link>
  );
}
