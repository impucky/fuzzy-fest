import BackLink from "./BackLink";

export default function About() {
  return (
    <>
      <BackLink />
      <div className="text-md w-full p-6">
        <p>
          Please let me know if you spot something wrong or a missing festival!
        </p>
        <p>
          It should be obvious from what's already here but I'm sticking with
          stoner, heavy psych, doom, desert rock... (adding loose fits at my own
          discretion).
        </p>
        <p>
          You can leave a comment on the full{" "}
          <a
            className="text-[salmon] hover:text-white"
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1aEpZeCXN2CNiriD6nmHzKdiZtbndUAsIdvdfdBw8c_I/"
          >
            spreadsheet
          </a>{" "}
          or find me on discord <span className="text-[salmon]">@pucky</span>.
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
    </>
  );
}
