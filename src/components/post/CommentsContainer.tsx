// import CommentList from '@/components/common/post/CommentList';
// import CommentWriterModal from '@/components/common/post/CommentWriterModal';
// import { useState } from 'react';

// interface CommentsContainerProps {
//     slug: string;
// }

// const CommentsContainer = ({ slug }: CommentsContainerProps) => {
//     const [isCommentWriterModalOpen, setIsCommentWriterModalOpen] = useState(false);

//     return (
//         <section className='my-5 flex w-full max-w-3xl flex-col p-4'>
//             <div className='mb-4 flex flex-wrap justify-between gap-1'>
//                 <h1 className='relative top-1 text-xl font-bold text-foreground sm:text-2xl'>
//                     Share Your Thoughts!
//                 </h1>
//                 <button
//                     onClick={() => {
//                         setIsCommentWriterModalOpen(true);
//                     }}
//                     className='rounded-2xl border border-primary bg-primary px-3 py-1 text-lg font-semibold text-white transition-all duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-700 sm:text-xl'
//                 >
//                     Comment
//                 </button>
//             </div>
//             <CommentList />
//             {isCommentWriterModalOpen && (
//                 <CommentWriterModal
//                     slug={slug}
//                     isCommentWriterModalOpen={isCommentWriterModalOpen}
//                     setIsCommentWriterModalOpen={setIsCommentWriterModalOpen}
//                 />
//             )}
//         </section>
//     );
// };

// export default CommentsContainer;
