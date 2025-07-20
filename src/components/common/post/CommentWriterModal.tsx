import { getTodayDate } from '@/utils/date';
import clsx from 'clsx';
import { useState, type ChangeEvent } from 'react';

interface CommentWriterModalProps {
    slug: string;
    isCommentWriterModalOpen: boolean;
    setIsCommentWriterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentWriterModal = ({
    slug,
    isCommentWriterModalOpen,
    setIsCommentWriterModalOpen,
}: CommentWriterModalProps) => {
    // form data
    const [userName, setUserName] = useState('');
    const [todayDate, setTodayDate] = useState('');
    const [comment, setComment] = useState('');

    // for fallback UI
    const [isUserNameInvalid, setIsUserNameValid] = useState(false);
    const [isTodayDateInvalid, setIsTodayDateInvalid] = useState(false);
    const [isCommentInvalid, setIsCommentInvalid] = useState(false);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'userName') setUserName(value);

        if (name === 'todayDate') setTodayDate(value);

        if (name === 'comment') setComment(value);

        return;
    };
    const handlePostCommentWorkflow = () => {
        // validation inspection
        const userNameInvalid = userName.trim() === '' ? true : false;
        const todayDateInvalid = todayDate.trim() === '' ? true : false;
        const commentInvalid = comment.trim() === '' ? true : false;

        setIsUserNameValid(userNameInvalid);
        setIsTodayDateInvalid(todayDateInvalid);
        setIsCommentInvalid(commentInvalid);

        if (userNameInvalid || todayDateInvalid || commentInvalid) {
            alert(
                'Your Name, Today Date, Your Comment are required fields, so please fill them all out.',
            );
            return;
        }

        if (
            confirm(
                'Ready to post your comment? Please note: comments can’t be edited once submitted.',
            )
        ) {
            alert('success');
        }
    };

    if (!isCommentWriterModalOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <div className='flex w-full max-w-md flex-col justify-start gap-2 rounded-sm bg-white p-6 shadow-xl'>
                <h2 className='mb-2 font-title text-xl font-semibold'>Comment Writer</h2>
                {/* name */}
                <div className='flex w-full flex-wrap gap-2'>
                    <h3 className='relative top-2 text-sm font-bold'>Your Name</h3>
                    <input
                        onChange={handleOnChange}
                        type='text'
                        name='userName'
                        placeholder='Enter your name'
                        className={clsx(
                            'flex-1 rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
                            isUserNameInvalid
                                ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
                                : 'border-border focus:border-primary focus:ring-primary',
                        )}
                    />
                </div>
                {/* date */}
                <div className='flex w-full flex-wrap gap-2'>
                    <h3 className='relative top-2 text-sm font-bold'>Today Date</h3>
                    <input
                        onChange={handleOnChange}
                        type='date'
                        name='todayDate'
                        value={getTodayDate()}
                        className={clsx(
                            'flex-1 rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
                            isTodayDateInvalid
                                ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
                                : 'border-border focus:border-primary focus:ring-primary',
                        )}
                    />
                </div>
                {/* comment */}
                <h3 className='mt-2 text-sm font-bold'>Your Comment</h3>
                <textarea
                    onChange={handleOnChange}
                    name='comment'
                    placeholder='Write comment here...'
                    className={clsx(
                        'min-h-[200px] w-full rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
                        isCommentInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
                            : 'border-border focus:border-primary focus:ring-primary',
                    )}
                ></textarea>
                <div className='mt-6 flex w-full flex-nowrap items-center justify-between gap-2'>
                    <button
                        onClick={() => {
                            setIsCommentWriterModalOpen(false);
                        }}
                        className='h-8 w-20 rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-white hover:bg-muted/70 active:bg-muted/70'
                    >
                        Close
                    </button>
                    <button
                        onClick={handlePostCommentWorkflow}
                        className='active:bg-primary-70 h-8 w-20 rounded-md border border-primary bg-primary px-3 py-1 text-sm text-white hover:bg-primary/70'
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentWriterModal;
