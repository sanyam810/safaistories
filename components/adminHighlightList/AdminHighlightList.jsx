// import { POST } from "@/app/api/auth/[...nextauth]/route";
import AdminHighlightCard from "../adminHighlightCard/AdminHighlightCard";
import Card from "../cardC/card";
import Pagination from "../pagC/pagination2";
import Link from "next/link";
import { Button } from "../ui/button";

const getData=async(page)=>{
  const res= await fetch(`http://localhost:3000/api/adminHighlight?page=${page}`,{
    cache: "no-cache",
  })
  
  if(!res.ok){
    throw new Error(res.status);
  }

  return res.json();
}


const AdminHighlightList = async ({page})=>{
  
  const {highlight,count}= await getData(page);
  console.log(highlight)
  const POST_PER_PAGE=5;

  const hasPrev= POST_PER_PAGE * (page-1) > 0;
  const hasNext= POST_PER_PAGE * (page+1) + POST_PER_PAGE < count;

  return(
    <div className="flex-5 mx-auto min-h-screen max-w-screen-xl" style={{paddingTop:'70px'}}>
        
        <div className="my-8 text-2xl font-bold">Manage Database (Highlights)</div>
        <div style={{marginTop:'10px'}}>
          <Link href="/adminWrite" passHref>
            <Button>Create Highlight</Button>
          </Link>
        </div>
        
        <div className="flex flex-col mt-8">
          {highlight?.map((item)=>(
            <AdminHighlightCard key={item._id} item={item}/>
          ))}
        </div>
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
      </div>
  )
}

export default AdminHighlightList;