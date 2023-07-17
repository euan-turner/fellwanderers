import ImageSlideshow from './ImageSlideshow.tsx';

interface HikeArchiveProps {
  title: string;
  desc: string;
  images: string[];
  textLeft: boolean;
}

export default function HikeArchive({ title, desc, images, textLeft }: HikeArchiveProps) {
  const style = ["w-full", "flex", textLeft ? "flex-row" : "flex-row-reverse", "rounded-md", "border-4", "border-green-900/20"];
  return (
    <div className={"h-screen px-10 py-5"}>
      <div className={style.join(' ')}>
        <div className={"flex-1"}>
          <div className={"h-full"}>
            <h1 className={"text-3xl font-bold mb-2 p-2"}>
              {title}
            </h1>
            <p className={"p-2"}>
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