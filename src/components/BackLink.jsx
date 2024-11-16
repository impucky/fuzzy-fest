import { Link } from "wouter";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="text-md p-2 text-center text-[salmon] shadow-md transition hover:bg-neutral-700 hover:text-white hover:underline"
    >
      ← Back to list
    </Link>
  );
}
