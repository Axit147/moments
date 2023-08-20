import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts'

const Comments = ({ post }) => {

    // const [comments, setComments] = useState(post.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentRef = useRef()

    const clickHandler = async (e) => {
        e.preventDefault()
        const finalComment = `${user?.result?.name}: ${comment}`;
        await dispatch(commentPost(finalComment, post._id));
        post.comments.push(finalComment)
        setComment('');
        commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }



    return (
        <div className='mt-3'>
            <header>Comments</header>
            <div className='pl-3 max-h-[175px] overflow-y-auto'>
                {post?.comments?.map((c, i) => (
                    <p key={i}>
                        <strong>
                            {c.split(':')[0]}:
                        </strong>
                        {c.split(':')[1]}
                    </p>
                ))}
                <div ref={commentRef} />
            </div>
            <div>

                {user?.result?.name && (
                    <div className='mt-6'>
                        <h2>Write a comment</h2>
                        <form action="">
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Comment' className='border outline-0 w-full p-2' />
                            <button onClick={clickHandler} className={`w-full px-3 py-2 text-white rounded-md hover:rounded-3xl hover:opacity-80 duration-300 ${!comment ? 'bg-gray-200 pointer-events-none' : 'bg-sky-600'}`}>Comment</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comments