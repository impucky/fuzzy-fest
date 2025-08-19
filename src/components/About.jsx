export default function About() {
  return (
    <div className="text-md flex w-full flex-col gap-2 overflow-y-auto p-6 pt-12">
      <p>
        <span className="font-logo text-lg text-[salmon]">FUZZY FEST</span> is
        my attempt at mapping out the many festivals featuring heavy psych,
        desert rock, stoner, doom... in Europe. It's a reflection of my personal
        tastes and is by no means exhaustive.
      </p>
      <p>
        I do my best to keep the info up to date, but when in doubt always trust
        the events' official websites and social media.
      </p>
      <p>
        Please let me know if you spot something wrong or a missing festival.
        I'm particularly interested in smaller fests featuring local bands, as I
        have limited means of searching outside of French and English content.
      </p>
      <p>
        You can reach me on{" "}
        <Link
          url="https://discord.com/users/170272843525783552"
          text="Discord"
        />{" "}
        or <Link url="https://instagram.com/raphael.pucky/" text="Instagram" />.
      </p>
      <p>
        The project is also on{" "}
        <Link url="https://github.com/impucky/fuzzy-fest" text="GitHub" />.
      </p>
    </div>
  );
}

const Link = ({ url, text }) => (
  <a
    className="text-[salmon] underline transition-all hover:text-white"
    target="_blank"
    href={url}
  >
    {text}
  </a>
);
