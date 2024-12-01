import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto p-6 px-2 text-center">
      <h2 className="font-vk mb-4 text-center text-2xl font-bold sm:text-3xl">
        Welcome to{" "}
        <span className="font-logo text-2xl text-[salmon]">FUZZY FEST</span> !
      </h2>
      <p className="text-xl">
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
