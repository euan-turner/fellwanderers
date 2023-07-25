import ImageSlideshow from "./ImageSlideshow.tsx";
import Hike from "../types/Hike.ts";

export default function HikeArchive(hike: Hike) {
  const style =
    "h-full w-full flex rounded-md border-4 border-logoGreen-dark flex-col ".concat(
      hike.textLeft ? "lg:flex-row" : "lg:flex-row-reverse",
    );
  return (
    <div className={"h-[32rem] px-4 lg:px-10 py-5"}>
      <div className={style}>
        <div className={"flex-1 overflow-y-scroll mb-1"}>
          <div className={"px-2 lg:px-8"}>
            <h1
              className={
                "sticky bg-white bg-opacity-95 top-0 text-xl lg:text-3xl font-bold py-2"
              }
            >
              {hike.title}
            </h1>
            <p className={"text-sm lg:text-base"}>{hike.desc}</p>
          </div>
        </div>
        <div className={"flex-1"}>
          <div className={"h-full"}>
            <ImageSlideshow directory={hike.directory} />
          </div>
        </div>
      </div>
    </div>
  );
}
