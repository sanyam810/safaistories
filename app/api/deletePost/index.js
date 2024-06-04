import { unstable_noStore as noStore } from 'next/cache';

export const DELETE = async (req,{params}) => {
  noStore()
    const {slug} = params;
  
    try {
      const deletedPost = await prisma.post.delete({
        where: {
          slug,
        },
      });
  
      return new NextResponse(
        JSON.stringify(deletedPost, { status: 200 })
      );
    } catch (err) {
      console.error(err);
      return new NextResponse(
        JSON.stringify({ message: err.message }, { status: 500 })
      );
    }
};