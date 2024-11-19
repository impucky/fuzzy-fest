import "./bounce.css";

export default function Spinner() {
  return (
    <div className="flex h-16 w-20 items-center justify-center gap-1">
      {[1, 2, 3, 2, 1, 2, 3, 2, 1].map((height, i) => {
        return (
          <div
            key={i}
            className={`h-[${height * 10}px] w-1 rounded-sm bg-red-400 shadow-[0_0_8px_#f87171]`}
            style={{
              height: `${height * 10}px`,
              animation: "bounce 1s infinite ease-in-out",
              animationDelay: `-${height + i / 8}s`,
            }}
          ></div>
        );
      })}
    </div>
  );
}
