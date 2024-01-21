import Image from "next/image";
import { Button } from "./ui/button";
import Link from 'next/link';


const getData = async () => {
  try {
      const res = await fetch('http://localhost:3000/api/featured', {
          cache: "no-store"
      });
      const data = await res.json();
      return data;
  } catch (err) {
      console.error(err);
      return null;
  }
}

const Featured = async() => {

    const data=await getData();
    const { title, summary, image,slug } = data[0];
    
    return (
        <div className="container mx-auto px-6 min-h-screen max-w-screen-xl">
          <h1 className="text-6xl font-light mt-8 md:text-4xl lg:text-5xl xl:text-6xl">
            Discover our <b>safai stories</b> and podcasts.
          </h1>
          <div className="flex flex-col md:flex-row mt-16">
            <div className="md:w-1/2">
              <div className="h-72 md:h-96 lg:h-500 relative">
                <Image src={image} alt="" layout="fill" objectFit="cover" />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                {title}
              </h1>
              <p className="mt-4 text-sm md:text-lg lg:text-xl font-light text-gray-500">
                {summary}
              </p>
              <Link href={`/highlights/${slug}`} passHref>
                <Button className="mt-4 px-6 py-3 font-medium rounded-md" variant="default">
                  Read More
                </Button>
              </Link>
              {/* <Button className="mt-4 px-6 py-3 font-medium rounded-md" variant="default" onClick={handleButtonClick}> Read More </Button> */}
            </div>
          </div>
        </div>
      );
}
 
export default Featured;