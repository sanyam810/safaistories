// import { POST } from "@/app/api/auth/[...nextauth]/route";
import AdminCard from "../adminCard/AdminCard";
import Card from "../cardC/card";
import Pagination from "../pagC/pagination2";

const getData=async(page)=>{
  const res= await fetch(`http://localhost:3000/api/adminposts?page=${page}`,{
    cache: "no-cache",
  })
  
  if(!res.ok){
    throw new Error(res.status);
  }

  return res.json();
}


const AdminCardList = async ({page})=>{
  
  const {posts,count}= await getData(page);

  const POST_PER_PAGE=5;

  const hasPrev= POST_PER_PAGE * (page-1) > 0;
  const hasNext= POST_PER_PAGE * (page+1) + POST_PER_PAGE < count;

  return(
    <div className="flex-5 mx-auto min-h-screen max-w-screen-xl" style={{paddingTop:'70px'}}>
        
        <div className="my-8 text-2xl font-bold">Manage Database (Posts)</div>
          
        <div className="flex flex-col mt-8">
          {posts?.map((item)=>(
            <AdminCard key={item._id} item={item}/>
          ))}
        </div>
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
      </div>
  )
}

export default AdminCardList;