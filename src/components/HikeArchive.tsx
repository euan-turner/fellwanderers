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
          <div className={"h-full overflow-y-auto px-8 pt-4"}>
            <h1 className={"text-3xl font-bold mb-2"}>
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