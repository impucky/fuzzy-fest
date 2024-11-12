import { formatDate, loadJson } from "../utils";

export default function Festival(props) {
  const { info, bands } = props;

  if (!info) return <>...</>;

  return (
    <>
      <div className="mt-2 flex flex-col items-center justify-center text-center">
        <img className="p-8 pb-0" src={`.${info.logo}`} />
        <h2 className="text-3xl font-bold text-[salmon]">{info.name}</h2>
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
        <ul>
          {bands
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((b, i) => {
              return (
                <div
                  key={b.name + i}
                  className="group relative flex h-36 w-full items-center justify-center"
                >
                  <img
                    className="h-full w-full object-cover brightness-50 transition group-hover:brightness-75"
                    src={`.${b.photo}`}
                  />
                  <span className="absolute p-2 text-center text-3xl font-bold leading-8 outline drop-shadow-[1px_3px_0_salmon]">
                    {b.name}
                  </span>
                </div>
              );
            })}
        </ul>
      ) : (
        <span className="p-2 text-lg">To be announced</span>
      )}
    </>
  );
}
