import Image from "next/image";
import Comments from "@/components/commentsC/comments";
import { unstable_noStore as noStore } from 'next/cache';


const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
noStore();
  const { slug } = params;
  const data = await getData(slug);

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl">
      <div className="flex flex-col items-center gap-8">
        <div className="text-3xl">
           {data?.title}
        </div>
        <div className="flex flex-row gap-8 items-center">
          <div>
            <Image src={data?.user?.image} width={48} height={48}/>
          </div>
          <div>
            {data?.user.name}
          </div>
          <div>
            {data?.createdAt}
          </div>
        </div>
        {data?.img && (
          <div className="w-96 h-96 relative">
            <Image
              src={data.img}
              alt=""
              className="rounded-lg object-cover"
              layout="responsive"
              width={500}
              height={500}
            />
          </div>
        )}
        <div
          className="prose text-xl lg:prose-lg xl:prose-xl"
          dangerouslySetInnerHTML={{ __html: data?.desc }}
        />
        <div className="h-1 w-full bg-black my-8 text-sm"></div>
      </div>
      
      <div className="mt-16 mb-11">
          <Comments postSlug={slug} />
        </div>
    </div>
  );
};

export default SinglePage;