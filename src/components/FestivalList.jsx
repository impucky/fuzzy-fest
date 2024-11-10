import { Link } from "wouter";
import { baseUrl } from "../utils";

export default function FestivalList({ festivals }) {
  return (
    <>
      <h2 className="p-2 text-center text-4xl font-bold text-[salmon]">
        2025 Festivals
      </h2>
      <ul className="p-2">
        {festivals
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((f) => (
            <li key={f.name} className="p-1">
              <Link
                className="text-center text-3xl font-bold hover:drop-shadow-[2px_4px_0_salmon]"
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
