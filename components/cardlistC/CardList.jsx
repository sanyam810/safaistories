// import { POST } from "@/app/api/auth/[...nextauth]/route";
import Card from "../cardC/card";
import Pagination from "../pagC/pagination";

const getData=async(page)=>{
  const res= await fetch(`http://localhost:3000/api/posts?page=${page}`,{
    cache: "no-cache",
  })
  
  if(!res.ok){
    throw new Error(res.status);
  }

  return res.json();
}

const CardList = async ({page})=>{
  const {posts,count}= await getData(page);

  const POST_PER_PAGE= 4;

  const hasPrev= POST_PER_PAGE * (page-1) > 0;
  const hasNext= POST_PER_PAGE * (page+1) + POST_PER_PAGE < count;

  return(
    <div className="flex-5 mx-auto min-h-screen max-w-screen-xl">
        
        <div className="my-8 text-2xl font-bold">Read Stories</div>
        <div className="flex flex-col mt-16">
          {posts?.map((item)=>(
            <Card key={item._id} item={item}/>
          ))}
        </div>
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
      </div>
  )
}

export default CardList;