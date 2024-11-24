export default function About() {
  return (
    <div className="text-md mt-4 w-full p-6">
      <p>
        <span className="font-logo text-lg text-[salmon]">FUZZY FEST</span> is
        my attempt at mapping out the many festivals featuring heavy psych,
        stoner, doom... in Europe.
      </p>
      <p>
        Please let me know if you spot something wrong or a missing festival!
      </p>
      <p>
        I'm particularly interested in smaller festivals featuring local bands.
      </p>
      <p>
        You can leave a comment on the{" "}
        <a
          className="text-[salmon] hover:text-white"
          target="_blank"
          href="https://docs.google.com/spreadsheets/d/1aEpZeCXN2CNiriD6nmHzKdiZtbndUAsIdvdfdBw8c_I/"
        >
          spreadsheet
        </a>{" "}
        or message me on discord <span className="text-[salmon]">@pucky</span>.
      </p>
      <p>
        The project is also on{" "}
        <a
          className="text-[salmon] hover:text-white"
          target="_blank"
          href="https://github.com/impucky/fuzzy-fest"
        >
          Github
        </a>
        .
      </p>
    </div>
  );
}
