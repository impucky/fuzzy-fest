import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto p-6 px-2 text-center">
      <LandingHeader />
      <h3 className="mt-6 text-center text-lg sm:text-2xl">Welcome !</h3>
      <p className="text-md sm:text-xl">
        You can get started by looking around the map and using the filters, or
        go straight to the{" "}
        <Link
          className="text-nowrap font-bold text-[salmon] underline transition hover:text-white"
          href="/festivals"
        >
          full list of festivals in 2025
        </Link>
        .
      </p>
      <p className="mt-4">
        More on the project on the{" "}
        <Link
          className="text-nowrap text-[salmon] underline transition hover:text-white"
          href="/about"
        >
          about page
        </Link>
        .
      </p>
    </div>
  );
}

function LandingHeader() {
  return (
    <>
      <h1 className="font-logo mt-4 text-4xl font-bold text-[#fc9084] drop-shadow-[0px_5px_0_#bf4e4e] sm:text-5xl xl:text-6xl">
        FUZZY FEST
      </h1>
      <h2 className="font-vk text-lg sm:text-xl xl:text-2xl">
        Heavy music festivals across Europe
      </h2>
    </>
  );
}
