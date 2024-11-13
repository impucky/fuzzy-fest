import { Link } from "wouter";

export default function FestivalList({
  festivals,
  highlight,
  onFestivalHover,
}) {
  return (
    <>
      <h2 className="mt-2 border-b border-[salmon] p-1 text-center text-3xl font-bold text-[salmon]">
        2025
      </h2>
      <ul className="flex flex-wrap items-start justify-start overflow-y-auto p-2 text-center">
        {festivals
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((f) => (
            <li
              key={f.name}
              className="w-full p-1 md:w-1/2 lg:w-full"
              onMouseEnter={() => onFestivalHover(f.slug)}
              onMouseLeave={() => onFestivalHover(null)}
            >
              <Link
                className={`text-center text-2xl font-bold hover:drop-shadow-[2px_2px_0_salmon] ${highlight === f.slug ? "drop-shadow-[2px_2px_0_salmon]" : ""}`}
                href={`/${f.slug}`}
              >
                {f.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
