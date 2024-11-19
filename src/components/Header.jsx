export default function Header() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 z-[500] flex h-fit w-min flex-col items-start p-3 text-center drop-shadow-[2px_2px_2px_#232634] sm:top-0">
      <h1 className="font-logo text-2xl font-bold text-[#fc9084] drop-shadow-[0px_5px_0_#bf4e4e] sm:text-nowrap md:text-3xl lg:text-4xl xl:text-5xl">
        FUZZY FEST
      </h1>
      <h2 className="font-vk text-md sm-block hidden w-full font-bold sm:block">
        Heavy music festivals across Europe
      </h2>
    </div>
  );
}
