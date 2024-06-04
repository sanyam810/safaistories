

import Card from "@/components/cardC/card";
import AdminCardList from "@/components/adminCardList/AdminCardList";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import Nav from "@/components/nav";
import { unstable_noStore as noStore } from 'next/cache';



const BlogPage = async ({searchParams}) => {
  noStore();
  const page = parseInt(searchParams.page) || 1;
//   const { cat } = searchParams;

  const session=await getServerSession(authOptions);
  console.log(session)
  if(session?.user.role !== 'ADMIN'){
    throw new Error('You need to be an admin to access this page')
  }

  return (
    <div>
      {/* <div>
        <Nav />
      </div> */}
    <div className="container mx-auto py-8">
      <div className="flex gap-12 mt-8">
        <AdminCardList page={page}/>
      </div>
    </div>
    </div>
  );
};

export default BlogPage;