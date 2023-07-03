interface TextImageProps {
  title: string;
  text: string;
  src: string;
  alt: string;
  textLeft: boolean;
}

// TODO: Improve to take in a div for the text side, containing links and text: https://stackoverflow.com/questions/25797048/how-to-pass-in-a-react-component-into-another-react-component-to-transclude-the
export default function TextImage({ title, text, src, alt, textLeft }: TextImageProps) {
  const style = ["flex", textLeft ? "flex-row" : "flex-row-reverse", "h-60", "px-10", "py-5"];
  return (
    
    <div className={style.join(' ')}>
      <div className={"w-1/2 p-4"}>
        <h1 className={"text-3xl font-bold mb-2"}>
          {title}
        </h1>
        <p className={"text-gray-700"}>
          {text}
        </p>
      </div>
      <div className={"w-1/2"}>
        <img src={src} alt = {alt} className={"object-cover w-full h-full"}/>
      </div>
    </div>
  )
}