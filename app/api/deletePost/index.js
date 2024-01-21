export const DELETE = async (req,{params}) => {
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