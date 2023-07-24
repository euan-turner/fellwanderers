import ImageSlideshow from "./ImageSlideshow.tsx";
import Hike from "../types/Hike.ts";

export default function HikeArchive(hike: Hike) {
  const style = "h-full w-full flex rounded-md border-4 border-logoGreen-dark";
  style.concat(hike.textLeft ? "flex-row" : "flex-row-reverse");
  return (
    <div className={"h-[32rem] px-10 py-5"}>
      <div className={style}>
        <div className={"flex-1"}>
          <div className={"h-full px-8 overflow-y-auto"}>
            <h1
              className={
                "sticky bg-white bg-opacity-95 top-0 text-3xl font-bold py-2"
              }
            >
              {hike.title}
            </h1>
            <p>{hike.desc}</p>
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
