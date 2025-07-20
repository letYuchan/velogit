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
    const [githubUserName, setGithubUserName] = useState('');
    const [githubToken, setGithubToken] = useState('');
    const [todayDate, setTodayDate] = useState('');
    const [comment, setComment] = useState('');

    // for fallback UI
    const [isGithubUserNameInvalid, setIsGithubUserNameInValid] = useState(false);
    const [isGithubTokenInvalid, setIsGithubTokenInvalid] = useState(false);
    const [isTodayDateInvalid, setIsTodayDateInvalid] = useState(false);
    const [isCommentInvalid, setIsCommentInvalid] = useState(false);

    const closeCommentWriterModal = () => {
        setGithubUserName('');
        setGithubToken('');
        setTodayDate('');
        setComment('');
        setIsCommentWriterModalOpen(false);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'githubUserName') setGithubUserName(value);

        if (name == 'githubUserToken') setGithubToken(value);

        if (name === 'todayDate') setTodayDate(value);

        if (name === 'comment') setComment(value);

        return;
    };
    const handlePostCommentWorkflow = () => {
        // validation inspection
        const githubUserNameInvalid = githubUserName.trim() === '' ? true : false;
        const githubUserTokenInvalid = githubToken.trim() === '' ? true : false;
        const todayDateInvalid = todayDate.trim() === '' ? true : false;
        const commentInvalid = comment.trim() === '' ? true : false;

        setIsGithubUserNameInValid(githubUserNameInvalid);
        setIsGithubTokenInvalid(githubUserTokenInvalid);
        setIsTodayDateInvalid(todayDateInvalid);
        setIsCommentInvalid(commentInvalid);

        if (githubUserNameInvalid || githubUserTokenInvalid || todayDateInvalid || commentInvalid) {
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
                <h2 className='mb-3 border-b border-b-border font-title text-xl font-semibold'>
                    Comment Writer
                </h2>
                {/* GitHub ID */}
                <div className='mb-3 flex w-full flex-wrap gap-2 px-2'>
                    <h3 className='relative top-2 text-sm font-bold'>Your GitHub username</h3>
                    <input
                        onChange={handleOnChange}
                        type='text'
                        name='githubUserName'
                        placeholder='Enter your GitHub username'
                        className={clsx(
                            'flex-1 rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
                            isGithubUserNameInvalid
                                ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
                                : 'border-border focus:border-primary focus:ring-primary',
                        )}
                    />
                </div>
                {/* GitHub Token */}
                <div className='mb-3 flex w-full flex-wrap gap-2 px-2'>
                    <h3 className='relative top-2 text-sm font-bold'>Your GitHub Token</h3>
                    <div className='flex flex-1 flex-col justify-start gap-1'>
                        <input
                            onChange={handleOnChange}
                            type='password'
                            name='githubUserToken'
                            placeholder='Enter your GitHub token'
                            className={clsx(
                                'flex-1 rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
                                isGithubTokenInvalid
                                    ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
                                    : 'border-border focus:border-primary focus:ring-primary',
                            )}
                        />
                        <a
                            href='https://github.com/settings/tokens'
                            className='text-right text-xs text-muted underline'
                        >
                            GitHub token issuance page
                        </a>
                    </div>
                </div>
                {/* date */}
                <div className='mb-3 flex w-full flex-wrap gap-2 px-2'>
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
                <div className='flex w-full flex-col gap-2 px-2'>
                    <h3 className='text-left text-sm font-bold'>Your Comment</h3>
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
                </div>
                <div className='mt-6 flex w-full flex-nowrap items-center justify-between gap-2'>
                    <button
                        onClick={closeCommentWriterModal}
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
