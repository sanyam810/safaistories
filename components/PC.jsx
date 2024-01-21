import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import Image from 'next/image';

const PC = ({postSlug}) => {

    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/comments?postSlug=${postSlug}`, {
            cache: 'no-cache',
          });
    
          if (!res.ok) {
            throw new Error(res.status);
          }
    
          const data = await res.json();
          setComments(data); // Assuming data is an array of comments for the postSlug
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        if (postSlug) {
          fetchComments();
        }
    }, [postSlug]);

    const deleteComment = async (commentId) => {
        try {
          const res = await fetch(`http://localhost:3000/api/comments?commentId=${commentId}`, {
            method: 'DELETE',
          });

          if(res.status === 200){
            toast.success('Comment deleted successfully!');
          }
    
          if (!res.ok) {
            toast.error('Error deleting comment');
          }
    
          // After successful delete, fetch comments again to update the UI
          fetchComments();
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
      };


    const commentsList = comments.map((comment) => (
        <div key={comment.id} style={{marginBottom:'20px',backgroundColor: '#F5F7F8',borderRadius:'12px'}}>
          <div className='flex flex-col' style={{marginTop:'10px'}}>
            <div className='flex gap-8' style={{marginTop:'20px',marginLeft:'10px'}}>
              <div  style={{
                borderRadius: '50%',
                overflow: 'hidden',
                minWidth: '100px', // Set a minimum width for the image container
                minHeight: '100px', // Set a minimum height for the image container
              }}>
                <Image src={comment.user.image} width={50} height={50} />
              </div>
              <div>
                <div className='gap-8'>
                  <div>
                    {comment.user.name}
                  </div>
                  <div>
                    {comment.createdAt.substring(0, 10)}
                  </div>
                </div>
                <div style={{marginBottom:'10px',marginRight:'10px'}}>
                {comment.desc}
              </div>
            </div>
              
            </div>
            
            <div style={{marginLeft:'10px',marginBottom:'15px'}}>
            <Button variant="default" onClick={() => deleteComment(comment.id)}>Delete</Button>
            </div>
          </div>
        </div>
      ));

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl mb-4">Comments for Post ID: {postSlug}</h2>
        <div className="w-full max-w-md">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments found for this post.</p>
          ) : (
            <div>{commentsList}</div>
          )}
        </div>
      </div>
    );
}
 
export default PC;