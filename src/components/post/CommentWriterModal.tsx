// import { POST_COMMENT_KEY } from '@/constants/comment.constants';
// import { saveAs } from 'file-saver';

// import clsx from 'clsx';
// import { useState, type ChangeEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getTodayDate } from '@/utils/write';

// interface CommentWriterModalProps {
//     slug: string;
//     isCommentWriterModalOpen: boolean;
//     setIsCommentWriterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const CommentWriterModal = ({
//     slug,
//     isCommentWriterModalOpen,
//     setIsCommentWriterModalOpen,
// }: CommentWriterModalProps) => {
//     // form data

//     const [ownerGithubName, setOwnerGithubName] = useState('');
//     const [ownerRepoName, setOwnerRepoName] = useState('');
//     const [commenterGithubName, setCommenterGithubName] = useState('');
//     const [githubToken, setGithubToken] = useState('');
//     const [todayDate, setTodayDate] = useState('');
//     const [comment, setComment] = useState('');

//     // for fallback UI
//     const [isOwnerGithubNameInvalid, setIsOwnerGithubNameInvalid] = useState(false);
//     const [isOwnerRepoNameInvalid, setIsOwnerRepoNameInvalid] = useState(false);
//     const [isCommenterGithubNameInvalid, setIsCommenterGithubNameInValid] = useState(false);
//     const [isGithubTokenInvalid, setIsGithubTokenInvalid] = useState(false);
//     const [isTodayDateInvalid, setIsTodayDateInvalid] = useState(false);
//     const [isCommentInvalid, setIsCommentInvalid] = useState(false);

//     const closeCommentWriterModal = () => {
//         setOwnerGithubName('');
//         setOwnerRepoName('');
//         setCommenterGithubName('');
//         setGithubToken('');
//         setTodayDate('');
//         setComment('');
//         setIsCommentWriterModalOpen(false);
//     };

//     const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;

//         if (name === 'ownerGithubName') setOwnerGithubName(value);

//         if (name === 'ownerRepoName') setOwnerRepoName(value);

//         if (name === 'commenterGithubName') setCommenterGithubName(value);

//         if (name == 'githubToken') setGithubToken(value);

//         if (name === 'todayDate') setTodayDate(value);

//         if (name === 'comment') setComment(value);

//         return;
//     };

//     const navigate = useNavigate();
//     const handlePostCommentWorkflow = () => {
//         if (slug === '') {
//             alert('Invalid Access.');
//             setIsCommentWriterModalOpen(false);
//             navigate('/');
//         }

//         const ownerGithubNameInvalid = ownerGithubName.trim() === '';
//         const ownerRepoNameInvalid = ownerRepoName.trim() === '';
//         const commenterGithubNameInvalid = commenterGithubName.trim() === '';
//         const githubUserTokenInvalid = githubToken.trim() === '';
//         const todayDateInvalid = todayDate.trim() === '';
//         const commentInvalid = comment.trim() === '';

//         setIsOwnerGithubNameInvalid(ownerGithubNameInvalid);
//         setIsOwnerRepoNameInvalid(ownerRepoNameInvalid);
//         setIsCommenterGithubNameInValid(commenterGithubNameInvalid);
//         setIsGithubTokenInvalid(githubUserTokenInvalid);
//         setIsTodayDateInvalid(todayDateInvalid);
//         setIsCommentInvalid(commentInvalid);

//         if (
//             ownerGithubNameInvalid ||
//             ownerRepoNameInvalid ||
//             commenterGithubNameInvalid ||
//             githubUserTokenInvalid ||
//             todayDateInvalid ||
//             commentInvalid
//         ) {
//             alert('All fields are required. Please fill them out completely.');
//             return;
//         }

//         if (
//             confirm(
//                 'Ready to post your comment? Please note: comments can’t be edited once submitted.',
//             )
//         ) {
//             const sanitizedSlug = slug.trim().replace(/\s+/g, '-');
//             const sanitizedUsername = commenterGithubName.trim().replace(/\s+/g, '-');
//             const sanitizedDate = todayDate.trim();

//             // 고유 파일명을 위한 timestamp
//             const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');

//             const jsonFileName = `${sanitizedSlug}__${sanitizedUsername}__${timestamp}.json`;

//             const commentData = {
//                 slug: sanitizedSlug,
//                 user: sanitizedUsername,
//                 date: sanitizedDate,
//                 comment: comment.trim(),
//             };

//             const blob = new Blob([JSON.stringify({ [POST_COMMENT_KEY]: commentData }, null, 2)], {
//                 type: 'application/json',
//             });

//             saveAs(blob, jsonFileName);

//             const cmd = `npx tsx scripts/autoPostComment.ts ${jsonFileName} ${ownerGithubName.trim()} ${ownerRepoName.trim()} ${sanitizedUsername} ${githubToken.trim()}`;

//             navigator.clipboard
//                 .writeText(cmd)
//                 .then(() => {
//                     alert(
//                         `Comment JSON exported as "${jsonFileName}"\n\nAuto command copied to clipboard:\n${cmd}`,
//                     );
//                     closeCommentWriterModal();
//                 })
//                 .catch(() => {
//                     alert(
//                         `Comment JSON exported as "${jsonFileName}"\nCould not copy command. Run manually:\n${cmd}`,
//                     );
//                 });
//         }
//     };

//     if (!isCommentWriterModalOpen) return null;

//     return (
//         <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
//             <div className='flex w-full max-w-md flex-col justify-start gap-2 rounded-sm bg-white p-6 shadow-xl'>
//                 <h2 className='mb-3 border-b border-b-border font-title text-xl font-semibold'>
//                     Comment Writer
//                 </h2>
//                 {/* Owner GitHub ID */}
//                 <div className='mb-3 flex w-full flex-wrap gap-2 px-2'>
//                     <h3 className='relative top-2 text-sm font-bold'>Owner GitHub Name</h3>
//                     <input
//                         onChange={handleOnChange}
//                         value={ownerGithubName}
//                         type='text'
//                         name='ownerGithubName'
//                         placeholder='Enter owner gitHub username.'
//                         className={clsx(
//                             'flex-1 rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
//                             isOwnerGithubNameInvalid
//                                 ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
//                                 : 'border-border focus:border-primary focus:ring-primary',
//                         )}
//                     />
//                 </div>
//                 {/* Owner repo name */}
//                 <div className='mb-3 flex w-full flex-wrap gap-2 px-2'>
//                     <h3 className='relative top-2 text-sm font-bold'>Owner Repo Name</h3>
//                     <input
//                         onChange={handleOnChange}
//                         value={ownerRepoName}
//                         type='text'
//                         name='ownerRepoName'
//                         placeholder='Enter owner repo name.'
//                         className={clsx(
//                             'flex-1 rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
//                             isOwnerRepoNameInvalid
//                                 ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
//                                 : 'border-border focus:border-primary focus:ring-primary',
//                         )}
//                     />
//                 </div>
//                 {/* Commenter GitHub ID */}
//                 <div className='mb-3 flex w-full flex-wrap gap-2 px-2'>
//                     <h3 className='relative top-2 text-sm font-bold'>Your GitHub Username</h3>
//                     <input
//                         onChange={handleOnChange}
//                         value={commenterGithubName}
//                         type='text'
//                         name='commenterGithubName'
//                         placeholder='Enter your github username.'
//                         className={clsx(
//                             'flex-1 rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
//                             isCommenterGithubNameInvalid
//                                 ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
//                                 : 'border-border focus:border-primary focus:ring-primary',
//                         )}
//                     />
//                 </div>
//                 {/* GitHub Token */}
//                 <div className='mb-3 flex w-full flex-wrap gap-2 px-2'>
//                     <h3 className='relative top-2 text-sm font-bold'>Your GitHub Token</h3>
//                     <div className='flex flex-1 flex-col justify-start gap-1'>
//                         <input
//                             onChange={handleOnChange}
//                             value={githubToken}
//                             type='password'
//                             name='githubToken'
//                             placeholder='Enter your github token.'
//                             className={clsx(
//                                 'flex-1 rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
//                                 isGithubTokenInvalid
//                                     ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
//                                     : 'border-border focus:border-primary focus:ring-primary',
//                             )}
//                         />
//                         <a
//                             href='https://github.com/settings/tokens'
//                             className='text-right text-xs text-muted underline'
//                         >
//                             GitHub token issuance page
//                         </a>
//                     </div>
//                 </div>
//                 {/* date */}
//                 <div className='mb-3 flex w-full flex-wrap gap-2 px-2'>
//                     <h3 className='relative top-2 text-sm font-bold'>Today Date</h3>
//                     <input
//                         onChange={handleOnChange}
//                         type='date'
//                         name='todayDate'
//                         value={getTodayDate()}
//                         className={clsx(
//                             'flex-1 rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
//                             isTodayDateInvalid
//                                 ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
//                                 : 'border-border focus:border-primary focus:ring-primary',
//                         )}
//                     />
//                 </div>
//                 {/* comment */}
//                 <div className='flex w-full flex-col gap-2 px-2'>
//                     <h3 className='text-left text-sm font-bold'>Your Comment</h3>
//                     <textarea
//                         onChange={handleOnChange}
//                         value={comment}
//                         name='comment'
//                         placeholder='Write comment here...'
//                         className={clsx(
//                             'min-h-[100px] w-full rounded-md border bg-background px-2 py-1 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
//                             isCommentInvalid
//                                 ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
//                                 : 'border-border focus:border-primary focus:ring-primary',
//                         )}
//                     ></textarea>
//                 </div>
//                 <div className='mt-6 flex w-full flex-nowrap items-center justify-between gap-2'>
//                     <button
//                         onClick={closeCommentWriterModal}
//                         className='h-8 w-20 rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-white hover:bg-muted/70 active:bg-muted/70'
//                     >
//                         Close
//                     </button>
//                     <button
//                         onClick={handlePostCommentWorkflow}
//                         className='active:bg-primary-70 h-8 w-20 rounded-md border border-primary bg-primary px-3 py-1 text-sm text-white hover:bg-primary/70 active:bg-primary/70'
//                     >
//                         Post
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CommentWriterModal;
