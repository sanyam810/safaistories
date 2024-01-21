"use client";

import Image from "next/image";
import Comments from "@/components/commentsC/comments";
import Nav from "@/components/nav";

const titleStyle = {
  fontFamily: 'Georgia,serif',
  fontSize: '4rem',
  // Add more font styles as needed
};

const descStyle = {
  fontFamily: 'Georgia,serif',
  fontSize: '1.2rem',
  // Add more font styles as needed
};
const descStyle2 = {
  fontFamily: 'Georgia,serif',
  fontSize: '1.5rem',
  lineHeight: '1.6'
  // Add more font styles as needed
};

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
  const { slug } = params;
  const data = await getData(slug);

  const contentStyle = {
    paddingTop: '5rem', // Adjust this value to create space below the fixed navbar
  };

  return (
    <div>
      <Nav />
      <div style={{ margin: '0 auto', minHeight: '100vh', maxWidth: '80rem' }}>
        {/* Apply padding top to the content section */}
        <div style={contentStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={titleStyle}>
              {data?.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem',...descStyle2 }}>
              {data?.user?.image && (
                <img classname="userImage2" src={data.user.image} alt="User" width={48} height={48} style={{ borderRadius: '50%' }}/>
              )}
              <div>{data?.user.name}</div>
              <div>{data?.createdAt.substring(0, 10)}</div>
            </div>
            {data?.img && (
              <img src={data.img} alt="Post" className="rounded-lg" width={800} height={500} />
            )}
            <div
              className="prose text-xl lg:prose-lg xl:prose-xl"
              dangerouslySetInnerHTML={{ __html: data?.desc }}
              style={{...descStyle2 }}
            />
            <div style={{ height: '1px', width: '100%', backgroundColor: 'black', margin: '1rem 0' }}></div>
          </div>

          <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
            <Comments postSlug={slug} />
          </div>
        </div>
      </div>
      {/* Media Queries for Responsive Design */}
      <style jsx>{`
        /* Adjust font sizes and layout for smaller screens */
        @media (max-width: 768px) {
          div {
            /* Modify styles as needed for smaller screens */
            padding-left: 4px;
            padding-right: 4px;
          }
          .userImage2{
            width:24px;
            height:24px;
          }
          
          /* Add more media queries and adjust styles as needed */
        }
      `}</style>
    </div>
  );
};

export default SinglePage;