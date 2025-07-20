import { useParams } from 'react-router-dom';
import { comments } from '@/utils/commentList';

const CommentList = () => {
    const { slug } = useParams();
    const filteredComments = comments.filter(comment => comment.slug === slug);

    if (!filteredComments.length) return null;

    return (
        <ul className='flex w-full flex-col items-start gap-4'>
            {filteredComments.map((comment, idx) => (
                <li
                    key={`${comment.user}-${comment.date}-${idx}`}
                    className='flex w-full items-start gap-3'
                >
                    {/* Left Avatar / Username */}
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white'>
                        {comment.user.charAt(0).toUpperCase()}
                    </div>

                    {/* Comment Bubble */}
                    <div className='relative max-w-[80%] rounded-md border border-border bg-background px-4 py-3 shadow-sm'>
                        <div className='mb-1 flex items-center justify-between text-xs text-muted'>
                            <span>{comment.user}</span>
                            <span>{comment.date}</span>
                        </div>
                        <p className='whitespace-pre-line text-sm leading-relaxed text-foreground'>
                            {comment.content}
                        </p>
                        {/* Speech bubble tail */}
                        <div className='absolute -left-2 top-3 h-3 w-3 rotate-45 border-l border-t border-border bg-background' />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CommentList;
