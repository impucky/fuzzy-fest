import { Link } from "wouter";
import { baseUrl } from "../utils";

export default function FestivalList({ festivals }) {
  return (
    <>
      <h2 className="p-2 text-center text-4xl font-bold">2025 Festivals</h2>
      <ul className="p-2">
        {festivals.map((f) => (
          <li key={f.name}>
            <Link
              className="p-4 text-center text-3xl font-bold leading-normal hover:drop-shadow-[2px_4px_0_salmon]"
              href={baseUrl + f.slug}
            >
              - {f.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
