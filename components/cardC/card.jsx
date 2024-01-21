import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Card = ({ key, item }) => {


  const mainDivStyle = {
    borderRadius: '40px', // Adjust the value to make the corners rounder
    paddingBottom: '40px', // Increase height (optional)
    /* Add other styles if needed */
  };

    return (
      <div className=" overflow-hidden bg-white p-6 mb-8 text-black" style={{ ...mainDivStyle, }}>
        <div className="flex flex-col md:flex-row gap-8">
          {item.img && (
            <div className="h-80 w-80 rounded-full overflow-hidden relative flex-shrink-0">
              <Image src={item.img} alt="" layout="fill" objectFit="cover" className="rounded-lg" />
                    <div className="text-white" style={{paddingLeft:'20px',width:'1000px'}}>
                        <div>hellllooooooooooooooooooooooooooooooooooo</div>
                        <div>hellllooooooooooooooooooooooooooooooooooo</div>
                        <div>hellllooooooooooooooooooooooooooooooooooo</div>
                        <div>hellllooooooooooooooooooooooooooooooooooo</div>
                        <div>hellllooooooooooooooooooooooooooooooooooo</div>
                        <div>hellllooooooooooooooooooooooooooooooooooo</div>
                        <div>hellllooooooooooooooooooooooooooooooooooo</div>
                    </div>
                    
            </div>
          )}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-2 mt-8 border-white rounded-full border-2 p-2">
              <span className="text-black">{item.createdAt.substring(0, 10)} </span>
            </div>
            <Link href={`/posts/${item.slug}`}>
              <h1 className="text-2xl font-bold cursor-pointer">{item.title}</h1>
            </Link>
            <p className="text-base text-gray-600">
              {item.desc.substring(3, 300)} ...
            </p>
            <Link href={`/posts/${item.slug}`} passHref>
              <Button variant="default">Read More</Button>
            </Link>
          </div>
            
        </div>
        <div className="rounded-lg" style={{height:'8px',backgroundColor:'black',marginTop:'30px'}}> </div>
        
        
      </div>
    );
  };

export default Card;
