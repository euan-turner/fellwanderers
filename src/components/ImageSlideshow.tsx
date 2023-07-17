import { useState } from 'react';

interface SlideshowProps {
  images: string[];
}

export default function ImageSlideshow({ images }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };
  
  return (
    <div className={"relative"}>
      <img src={images[currentSlide]} alt={"Slideshow Image"} className={"w-full h-auto object-cover"} />
      <div className={"absolute top-1/2 left-0 right-0 flex justify-between"}>
        <button className={"bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"} onClick={prevSlide}>
          Previous
        </button>
        <button className={"bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"} onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
}