import { Link } from "wouter";

export default function FestivalList({
  festivals,
  highlight,
  onFestivalHover,
}) {
  return (
    <>
      <h2 className="font-vk mt-2 border-b border-[salmon] p-1 text-center text-3xl font-bold text-[salmon]">
        Festivals in 2025:
      </h2>
      <ul className="font-vk flex flex-wrap items-start justify-start overflow-y-auto p-2 text-center">
        {festivals
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((f) => {
            const hl = highlight === f.slug;
            return (
              <li
                key={f.name}
                className="w-full md:w-1/2 lg:w-full"
                onMouseEnter={() => onFestivalHover(f.slug)}
                onMouseLeave={() => onFestivalHover(null)}
              >
                <Link
                  className={`text-center text-2xl font-bold hover:drop-shadow-[2px_2px_0_salmon] ${hl ? "drop-shadow-[2px_2px_0_salmon]" : ""}`}
                  href={`/${f.slug}`}
                >
                  {`${hl ? "- " : ""}${f.name}${hl ? " -" : ""}`}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
