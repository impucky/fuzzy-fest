import { formatDate, loadJson } from "../utils";

export default function Festival(props) {
  const { info, bands } = props;
  // prefix image url in dev
  const isDev = import.meta.env.DEV;

  if (!info) return <>...</>;

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="flex flex-col items-center justify-center text-center">
        <img
          className="mt-2 max-h-64 w-auto p-1"
          src={`${isDev ? "." : ""}${info.logo}`}
        />
        <h2 className="text-xl font-bold sm:text-2xl">{info.name}</h2>
        <p className="text-xl">
          {info.location.city}, {info.location.country}
        </p>
        <p>
          {formatDate(info.dates.start)} - {formatDate(info.dates.end)}, 2025
        </p>
        <a
          href={info.website}
          target="_blank"
          className="cursor-pointer text-[salmon] underline transition hover:text-white"
        >
          Website
        </a>
      </div>
      <h3 className="p-2 text-2xl font-bold">Lineup</h3>
      {bands.length > 0 ? (
        <ul className="flex flex-wrap">
          {bands
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((b, i) => {
              return (
                <li
                  key={b.name + i}
                  className="group relative flex h-32 w-full items-center justify-center md:w-1/2 lg:w-full"
                >
                  <img
                    className="h-full w-full object-cover brightness-50 transition group-hover:brightness-75"
                    src={`${isDev ? "." : ""}${b.photo}`}
                  />
                  <span className="absolute p-2 text-center text-3xl font-bold leading-8 outline drop-shadow-[1px_3px_0_salmon]">
                    {b.name}
                  </span>
                </li>
              );
            })}
        </ul>
      ) : (
        <span className="p-2 text-lg">To be announced</span>
      )}
    </div>
  );
}
