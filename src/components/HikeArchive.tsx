import ImageSlideshow from './ImageSlideshow.tsx';

interface HikeArchiveProps {
  title: string;
  desc: string;
  images: string[];
  textLeft: boolean;
}

export default function HikeArchive({ title, desc, images, textLeft }: HikeArchiveProps) {
  const style = ["h-full", "w-full", "flex", textLeft ? "flex-row" : "flex-row-reverse", "rounded-md", "border-4", "border-logoGreen-dark"];
  return (
    <div className={"h-[32rem] px-10 py-5"}>
      <div className={style.join(' ')}>
        <div className={"flex-1"}>
          <div className={"h-full px-8 overflow-y-auto"}>
            <h1 className={"sticky bg-white bg-opacity-95 top-0 text-3xl font-bold py-2"}>
              {title}
            </h1>
            <p>
              {desc}
            </p>
          </div>
        </div>
        <div className={"flex-1"}>
          <div className={"h-full"}>
            <ImageSlideshow images={images} />
          </div>
        </div>
      </div>
    </div>
  )
}