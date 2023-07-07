interface TextImageProps {
  title: string;
  content: JSX.Element;
  src: string;
  alt: string;
  textLeft: boolean;
}

// TODO: Improve to take in a div for the text side, containing links and text: https://stackoverflow.com/questions/25797048/how-to-pass-in-a-react-component-into-another-react-component-to-transclude-the
export default function TextImage({ title, content, src, alt, textLeft }: TextImageProps) {
  const style = ["w-full", "h-full", "flex", textLeft ? "flex-row" : "flex-row-reverse", "rounded-md", "border-4", "border-green-900/20"];
  return (
    <div className={"h-80 px-10 py-5"}>
      <div className={style.join(' ')}>
        <div className={"w-1/2 p-5"}>
          <h1 className={"text-3xl font-bold mb-2"}>
            {title}
          </h1>
          {content}
        </div>
        <div className={"w-1/2 p-5"}>
          <img src={src} alt = {alt} className={"object-cover w-full h-full"}/>
        </div>
      </div>
    </div>
    
  )
}