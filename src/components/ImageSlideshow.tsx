import {useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {getDownloadURL, listAll, ref} from "firebase/storage";

import {storage} from "../../firebase.ts";

interface SlideshowProps {
  directory: string;
}

export default function ImageSlideshow({ directory }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  useEffect(() => {
    async function fetchImageURLs() {
      try {
        const dirRef = ref(storage, directory);
        const listResult = await listAll(dirRef);
        const urlPromises = listResult.items.map(async (itemRef) => {
          return getDownloadURL(itemRef);
        });
        const urls = await Promise.all(urlPromises);
        setImageUrls(urls);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    }
    
    fetchImageURLs()
      .catch((error) => {
        console.error("Error fetching image URLs:", error);
      })
  }, [directory]);
  
  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % imageUrls.length);
  };
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + imageUrls.length) % imageUrls.length);
  };
  
  return (
    <div className={"relative w-full h-full overflow-hidden flex items-center"}>
      <img src={imageUrls[currentSlide]} alt={"Slideshow Image"} className={"w-full h-full object-center"} />
      <div className={"absolute top-1/2 left-0 right-0 flex justify-between"}>
        <button className={"bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"} onClick={prevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className={"bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"} onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}